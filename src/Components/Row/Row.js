import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { VIEW_TYPE } from '../../utils/constants';
import sortEventsUtil from '../../utils/sortEvents';
import eventLevel from '../../utils/eventLevel';
import { arrayCheck, variablesCheck, dateCheck } from '../../utils/changeCheck';
import BackgroundRow from '../BackgroundRow';
import EventRowWrapper from '../EventRowWrapper';
import DateSlotWrapper from '../DateSlotWrapper';
import styles from './styles.css';

class Row extends Component {
    prevEvents = [];
    prevSortEvents = [];
    
    isMonth = () => {
        const { currentView } = this.props;
        
        return currentView === VIEW_TYPE.month;
    };

    shouldComponentUpdate = nextProps => {
        const { 
            events, isSelecting, itemArr, lastSelectedDate, 
            selectedEnd, selectedStart
        } = this.props;

        const checkEvents = arrayCheck(events, nextProps.events);
        const checkIsSelecting = variablesCheck(isSelecting, nextProps.isSelecting);
        const checkItemArr = arrayCheck(itemArr, nextProps.itemArr);
        const checkLastSelectedDate = dateCheck(lastSelectedDate, nextProps.lastSelectedDate);
        const checkSelectedEnd = dateCheck(selectedEnd, nextProps.selectedEnd);
        const checkSelectedStart = dateCheck(selectedStart, nextProps.selectedStart);

        return !(
            checkEvents && checkIsSelecting && checkItemArr && 
            checkLastSelectedDate && checkSelectedEnd && checkSelectedStart
        );
    };

    componentDidMount = () => {
        if(this.isMonth()) {
            this.getRowLimit();
            window.addEventListener('resize', this.getRowLimit);
        }
    };

    componentDidUpdate = prevProps => {
        if(this.isMonth() && prevProps.events !== this.props.events) {
            this.getRowLimit();
        }
    };

    componentWillUnmount = () => {
        if(this.isMonth()) {
            window.removeEventListener('resize', this.getRowLimit);
        }
    };

    sameEventRow = (sortEvents, eventProperty) => {
        const { itemArr } = this.props;
        let newEvents = eventLevel(itemArr[0], itemArr[itemArr.length - 1], sortEvents, eventProperty);

        return newEvents;
    };

    getRowLimit = () => {
        const { useExtend } = this.props;

        if(useExtend) return;
        
        const rowHeight = this.row.clientHeight;
        const dateHeader = this.header.clientHeight;
        const eventSpace = rowHeight - dateHeader;
        const eventRow = this.eventRowWrapperRef.getEventRowHeight();
        const limit = eventRow === 0 ? 0 : Math.max(Math.floor(eventSpace / eventRow));
        
        if(limit > 0) {
            const { setLimit } = this.props;

            setLimit(limit);
        }
    };

    getMorePosition = () => {
        const { customize : { More : { alignItems } } } = this.props;

        return alignItems;
    };

    differenceEvents = (prevEvents, currentEvents) => {
        return (prevEvents.length !== currentEvents.length || !arrayCheck(prevEvents, currentEvents));
    };

    sortEvents = () => {
        const { events, eventProperty } = this.props;
        let sortEvents = events ? this.prevSortEvents : [];

        if(events && this.differenceEvents(this.prevEvents, events)) {
            sortEvents = sortEventsUtil(events, eventProperty);
            
            this.prevEvents = events;
            this.prevSortEvents = sortEvents;
        }

        return sortEvents;
    };

    render() {
        const { 
            today, itemArr, onSelectSlot, isSelecting, currentView,
            stopSelecting, startSelecting, setSelectedStart, setSelectedEnd,
            selectedStart, selectedEnd, lastSelectedDate, setLastSelectedDate,
            defaultSelectedDate, onSelectEvent, limit, openPopup, useDateHeader,
            moveDayView, useExtend, components, customize, eventProperty, usePopup,
            slotSelectEnd
        } = this.props;
        const sortEvents = this.sortEvents();
        const newLimit =  limit !== 0 && this.getMorePosition() === 'flex-end' ? limit - 1 : limit;

        return (
            <div className={ `${ styles.row }${ currentView !== VIEW_TYPE.month ? ` ${ styles.notMargin }` : '' }` } ref={ ref => this.row = ref }>
                <BackgroundRow itemArr={ itemArr } onSelectSlot={ onSelectSlot } isSelecting={ isSelecting }
                    stopSelecting={ stopSelecting } startSelecting={ startSelecting } setSelectedStart={ setSelectedStart }
                    setSelectedEnd={ setSelectedEnd } selectedStart={ selectedStart } selectedEnd={ selectedEnd }
                    lastSelectedDate={ lastSelectedDate } setLastSelectedDate={ setLastSelectedDate } defaultSelectedDate={ defaultSelectedDate }
                    limit={ limit } events={ sortEvents } openPopup={ openPopup } today={ today } customize={ customize }
                    useExtend={ useExtend } eventProperty={ eventProperty } currentView={ currentView } usePopup={ usePopup }
                    slotSelectEnd={ slotSelectEnd } />
                <div className={ styles.dateContent }>
                    <div className={ styles.rowHeader } ref={ ref => this.header = ref }>
                        {
                            useDateHeader && (
                                <DateSlotWrapper moveDayView={ moveDayView } isSelecting={ isSelecting } startSelecting={ startSelecting }
                                    itemArr={ itemArr } today={ today } customize={ customize } />
                            )
                        }
                    </div>
                    <div className="eventBox">
                        <EventRowWrapper ref={ ref => this.eventRowWrapperRef = ref } events={ sortEvents } onSelectEvent={ onSelectEvent } components={ components } 
                            limit={ newLimit } slotStart={ itemArr[0] } slotEnd={ itemArr[itemArr.length - 1] }
                            isSelecting={ isSelecting } startSelecting={ startSelecting } currentView={ currentView } 
                            eventProperty={ eventProperty } limit={ limit } />
                    </div>
                </div>
            </div>
        );
    }
}

Row.defaultProps = {
    useDateHeader : true,
    openPopup : () => {}
};

Row.propTypes = {
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    defaultSelectedDate : PropTypes.instanceOf(moment),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number,
        title : PropTypes.string,
        start : PropTypes.instanceOf(Date),
        end : PropTypes.instanceOf(Date),
        color : PropTypes.string,
        allDay : PropTypes.bool
    })),
    isSelecting : PropTypes.bool.isRequired,
    itemArr : PropTypes.arrayOf( PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.string.isRequired
    }).isRequired).isRequired,
    lastSelectedDate : PropTypes.instanceOf(moment),
    limit : PropTypes.number,
    select : PropTypes.shape({
        defaultSelectedDate : PropTypes.instanceOf(moment),
        isSelecting : PropTypes.bool.isRequired,
        lastSelectedDate : PropTypes.instanceOf(moment),
        selectedEnd : PropTypes.instanceOf(moment),
        selectedStart : PropTypes.instanceOf(moment),
        setDefaultSelectedDate : PropTypes.func.isRequired,
        setLastSelectedDate : PropTypes.func.isRequired,
        setSelectedEnd : PropTypes.func.isRequired,
        setSelectedStart : PropTypes.func.isRequired,
        startSelecting : PropTypes.func.isRequired,
        stopSelecting : PropTypes.func.isRequired
    }).isRequired,
    selectable : PropTypes.bool.isRequired,
    selectedEnd : PropTypes.instanceOf(moment),
    selectedStart : PropTypes.instanceOf(moment),
    today : PropTypes.instanceOf(moment).isRequired,
    useDateHeader : PropTypes.bool.isRequired,
    useExtend : PropTypes.bool.isRequired,
    components : PropTypes.shape({
        header : PropTypes.elementType,
        dateSlot : PropTypes.elementType,
        eventBar : PropTypes.oneOfType([PropTypes.elementType, PropTypes.shape({
            components : PropTypes.instanceOf(Map).isRequired,
            key : PropTypes.string.isRequired
        })]),
        popup : PropTypes.elementType
    }),
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
    moveDayView : PropTypes.func,
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired,
    openPopup : PropTypes.func,
    setLastSelectedDate : PropTypes.func.isRequired,
    setLimit : PropTypes.func,
    setSelectedStart : PropTypes.func.isRequired,
    setSelectedEnd : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired,
    stopSelecting : PropTypes.func.isRequired
};

export default Row;