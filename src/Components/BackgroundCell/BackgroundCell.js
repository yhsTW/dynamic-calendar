import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import moment from 'moment';
import More from '../More';
import { makeTimeFormat } from '../../utils/dateUtil';
import combineStyle from '../../utils/combineStyle';
import { PROPERTY, CUSTOMIZE } from '../../utils/constants';
import Label from '../Label';


class BackgroundCell extends Component {
    cell = createRef();
    state = {
        isSelected : false
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(!nextProps.isSelecting && prevState.isSelecting) {
            return { isSelected : false };
        }

        return null;
    }

    resetTime = date => {
        date.set({ hour : 0, minute : 0, second : 0 });
    };

    makeSlots = (start, end) => {
        let slots = [];
        const { _data : { days } } = moment.duration(end.diff(start));

        for(let i = 0; i <= days; i++) {
            const pushDate = moment(start).add(i, 'days');
            slots.push(pushDate);
        }

        return slots;
    };

    selectEnd = () => {
        const { stopSelecting, onSelectSlot, selectedStart : start, selectedEnd : end, useTime } = this.props;

        stopSelecting();

        if(start) {
            if(!useTime) {
                this.resetTime(start);
                this.resetTime(end);
            }
            const slots = this.makeSlots(start, end);
    
            onSelectSlot({ slots, start, end });
        }
    };

    selectStart = () => {
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


    getBackgroundCellStyle = isSelected => {
        const { item, isToday, customize } = this.props;
        const styleObj = customize;
        let style = combineStyle({ 
            styleObj, item, isToday, property : PROPERTY.backgroundCellStyle 
        });
        
        // border가 겹치는 현상을 수정하기 위해 marginLeft와 marginBottom 추가
        if(styleObj.BackgroundCell.useBorder) {
            style = {
                ...style,
                ...styleObj.BackgroundCell.borderStyle, 
                marginLeft : '-1px', marginBottom : '-1px'
            };
        }

        if(isSelected) {
            style = { 
                ...style,
                ...styleObj.BackgroundCell.selectStyle 
            };
        }

        if(customize[CUSTOMIZE.more]) {
            style = { ...style, ...customize[CUSTOMIZE.more].position };
        }

        return style;
    };

    currentSelectTime = () => {
        let selectTime = '';
        const { selectedStart, selectedEnd } = this.props;

        const start = makeTimeFormat(selectedStart);
        const end = makeTimeFormat(selectedEnd);

        selectTime = `${ start } - ${ end }`;

        return selectTime;
    };

    render() {
        const { isMore, more, useTime, selectedStart, item : { date }, customize } = this.props;
        const isSelected = this.checkSelected();
        const backgroundCellStyle = this.getBackgroundCellStyle(isSelected);
        
        return (
            <div ref={ this.cell } className={ styles.backgroundCell } onMouseDown={ this.selectStart } onMouseUp={ this.selectEnd }
                onMouseEnter={ this.selecting } style={ backgroundCellStyle }>
                { (useTime && selectedStart && isSelected && selectedStart.isSame(date)) && <Label text={ this.currentSelectTime() } /> }
                { isMore && <More more={ more } openPopup={ this.openPopup } customize={ customize.More } /> }
            </div>
        );
    };
};

BackgroundCell.defaultProps = {
    useTime : false
};

BackgroundCell.propTypes = {
    customize : PropTypes.object.isRequired,
    defaultSelectedDate : PropTypes.instanceOf(moment),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
        color : PropTypes.string,
        allDay : PropTypes.bool
    })),
    isMore : PropTypes.bool.isRequired,
    isSelecting : PropTypes.bool.isRequired,
    isToday : PropTypes.bool.isRequired,
    item : PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.string.isRequired
    }).isRequired,
    lastSelectedDate : PropTypes.instanceOf(moment),
    more : PropTypes.number.isRequired,
    selectedEnd : PropTypes.instanceOf(moment),
    selectedStart : PropTypes.instanceOf(moment),
    useTime : PropTypes.bool,
    customize : PropTypes.shape({
        BackgroundCell : PropTypes.shape({
            useBorder : PropTypes.bool,
            borderStyle : PropTypes.object,
            selectStyle : PropTypes.object
        }),
        Popup : PropTypes.shape({}),
        More : PropTypes.shape({
            prefix : PropTypes.string,
            suffix : PropTypes.string,
            moreStyle : PropTypes.object,
            position : PropTypes.shape({
                alignItems : PropTypes.string,
                justifyContent : PropTypes.string
            })
        }),
        today : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        holiday : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        weekend : PropTypes.shape({
            saturdayStyle : PropTypes.object,
            sundayStyle : PropTypes.object
        }),
        weekdays : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        prevMonth : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        nextMonth : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        })
    }).isRequired,
    onSelectSlot : PropTypes.func,
    openPopup : PropTypes.func.isRequired,
    setLastSelectedDate : PropTypes.func,
    setSelectedStart : PropTypes.func,
    setSelectedEnd : PropTypes.func,
    startSelecting : PropTypes.func,
    stopSelecting : PropTypes.func
};

export default BackgroundCell;