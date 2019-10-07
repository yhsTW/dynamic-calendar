import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import moment from 'moment';
import More from '../More';

class BackgroundCell extends Component {
    cell = createRef();
    state = {
        isSelected : false
    };

    componentWillReceiveProps(nextProps) {
        if(!nextProps.isSelecting && this.state.isSelected) {
            this.setState({ isSelected : false });
        }
    };

    resetTime = date => {
        date.set({ hour : 0, minute : 0, second : 0 });
    };

    makeSlots = (start, end) => {
        let slots = [];
        const { _data : { days } } = moment.duration(end.diff(start));

        for(let i = 0; i <= days; i++) {
            const pushDate = moment(start).add('days', i);
            slots.push(pushDate);
        }

        return slots;
    };

    selectEnd = () => {
        const { stopSelecting, onSelectSlot, selectedStart : start, selectedEnd : end } = this.props;

        stopSelecting();

        if(start) {
            this.resetTime(start);
            this.resetTime(end);
            const slots = this.makeSlots(start, end);
    
            onSelectSlot({ slots, start, end });
        }
    };

    selectStart = () => {
        console.log('select start')
        const { startSelecting, item : { date } } = this.props;
        
        startSelecting(date);
    };

    selecting = () => {
        const { 
            isSelecting, setSelectedStart, setSelectedEnd, selectedStart, selectedEnd, 
            item : { date }, lastSelectedDate, setLastSelectedDate, defaultSelectedDate
        } = this.props;

        if(!isSelecting) return;

        if(!selectedStart && !selectedEnd && !lastSelectedDate && !defaultSelectedDate) {
            const { startSelecting } = this.props;

            startSelecting(date);
        } else {
            if(date.isBetween(selectedStart, selectedEnd, null, '[]')) {
                if(date - lastSelectedDate > 0) {
                    setSelectedStart(date);
                    setSelectedEnd(defaultSelectedDate);
                } else {
                    setSelectedStart(defaultSelectedDate);
                    setSelectedEnd(date);
                }
            } else {
                if(lastSelectedDate.isAfter(date)) {
                    setSelectedStart(date);
                    setSelectedEnd(defaultSelectedDate);
                } else {
                    setSelectedStart(defaultSelectedDate);
                    setSelectedEnd(date);
                }
            }
    
            setLastSelectedDate(date);
        }
        
    };

    checkSelected = () => {
        const { isSelecting, selectedStart, selectedEnd, item : { date } } = this.props;
        let isSelected = false;
    
        if(isSelecting && date.isBetween(selectedStart, selectedEnd, null, '[]')) {
            isSelected = true;
        }

        return isSelected;
    };

    openPopup = () => {
        const { events, item : { date }, openPopup : pOpenPopup } = this.props;
        const { top, left, width, height } = this.cell.current.getBoundingClientRect();

        pOpenPopup({ top, left, width, height, events, date });
    };

    getBackgroundCellStyle = (isSelected) => {
        // TODO: holiday는 나중에
        const { 
            item : { date }, isToday, customizeBackgroundCell : { 
                BackgroundCell : { useBorder, borderStyle, selectStyle }, 
                customizeToday, holiday, weekdays, weekend : { backgroundCellStyle : { saturdayStyle, sundayStyle } }
            }
        } = this.props;
        let style = {};
        
        if(isToday) style = { ...style, ...customizeToday.backgroundCellStyle };
        // border가 겹치는 현상을 수정하기 위해 marginLeft와 marginBottom 추가
        if(useBorder) style = { ...style, ...borderStyle, marginLeft : '-1px', marginBottom : '-1px' };
        if(isSelected) style = { ...style, ...selectStyle };
        if(date.day() !== 0 && date.day() !== 6) style = { ...style,...weekdays.backgroundCellStyle };
        if(date.day() === 0) style = { ...style, ...sundayStyle };
        if(date.day() === 6) style = { ...style, ...saturdayStyle };

        return style;
    };

    render() {
        const { isMore, more, customizeBackgroundCell : { More : customizeMore } } = this.props;
        const isSelected = this.checkSelected();
        const backgroundCellStyle = this.getBackgroundCellStyle(isSelected);

        return (
            <div ref={ this.cell } className={ styles.backgroundCell } onMouseDown={ this.selectStart } onMouseUp={ this.selectEnd }
                onMouseEnter={ this.selecting } style={ backgroundCellStyle }>
                { isMore && <More more={ more } openPopup={ this.openPopup } customizeMore={ customizeMore } /> }
            </div>
        );
    };
};

BackgroundCell.propTypes = {
    defaultSelectedDate : PropTypes.instanceOf(moment),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired
    })).isRequired,
    isMore : PropTypes.bool.isRequired,
    isSelecting : PropTypes.bool.isRequired,
    isToday : PropTypes.bool.isRequired,
    item : PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.string.isRequired
    }).isRequired,
    lastSelectedDate : PropTypes.instanceOf(moment),
    more : PropTypes.number.isRequired,
    selectedStart : PropTypes.instanceOf(moment),
    selectedEnd : PropTypes.instanceOf(moment),
    onSelectSlot : PropTypes.func,
    openPopup : PropTypes.func.isRequired,
    setLastSelectedDate : PropTypes.func,
    setSelectedStart : PropTypes.func,
    setSelectedEnd : PropTypes.func,
    startSelecting : PropTypes.func,
    stopSelecting : PropTypes.func
};

export default BackgroundCell;