import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import moment from 'moment';
import More from '../More';
import { makeTimeFormat } from '../../utils/dateUtil';
import combineStyle from '../../utils/combineStyle';
import { PROPERTY, CUSTOMIZE, VIEW_TYPE } from '../../utils/constants';
import Label from '../Label';


class BackgroundCell extends Component {
    isOpenPopup = false;

    state = {
        isSelected : false
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(!nextProps.isSelecting && prevState.isSelecting) {
            return { isSelected : false };
        }

        return null;
    };

    resizeControl = () => {
        const { usePopup } = this.props;

        if(!usePopup) return;

        this.openPopup();
    };

    componentDidMount = () => {
        window.addEventListener('resize', this.resizeControl);
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.resizeControl);
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
        
        if(isSelecting && selectedStart && selectedEnd && date.isBetween(selectedStart, selectedEnd, null, '[]')) {
            isSelected = true;
        }

        return isSelected;
    };

    openPopup = () => {
        const { usePopup } = this.props;
        
        if(usePopup === this.isOpenPopup) {
            const { events, item : { date }, openPopup : pOpenPopup } = this.props;
            const { top, left, width, height } = this.cell.getBoundingClientRect();

            pOpenPopup({ top, left, width, height, events, date });

            this.isOpenPopup = true;
        } else if(!usePopup) {
            this.isOpenPopup = usePopup;
        }
    };


    getBackgroundCellStyle = isSelected => {
        const { item, isToday, customize, currentView } = this.props;
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

        if(currentView !== VIEW_TYPE.month) {
            style.backgroundColor = '';
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

    resetIsOpenPopup = () => {
        const { usePopup } = this.props;

        !usePopup && (this.isOpenPopup = usePopup);
    };

    render() {
        const { isMore, more, useTime, selectedStart, item : { date }, customize, slotSelectEnd } = this.props;
        const isSelected = this.checkSelected();
        const backgroundCellStyle = this.getBackgroundCellStyle(isSelected);
        this.resetIsOpenPopup();
        
        return (
            <div ref={ ref => this.cell = ref } className={ styles.backgroundCell } onMouseDown={ this.selectStart } onMouseUp={ slotSelectEnd }
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
        id : PropTypes.number,
        title : PropTypes.string,
        start : PropTypes.instanceOf(Date),
        end : PropTypes.instanceOf(Date),
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