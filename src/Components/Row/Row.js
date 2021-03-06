import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import DateSlot from '../DateSlot';
import EventRow from '../EventRow';
import BackgroundRow from '../BackgroundRow';
import moment from 'moment';
import styles from './styles.css';
import { VIEW_TYPE, CUSTOMIZE } from '../../utils/constants';
import sortEventsUtil from '../../utils/sortEvents';
import eventLevel from '../../utils/eventLevel';
import withCustomize from '../../hoc/withCustomize';

class Row extends Component {
    row = createRef();
    header = createRef();
    eventRow = createRef();

    sameEventRow = (sortEvents) => {
        const { itemArr } = this.props;
        let newEvents = eventLevel(itemArr[0], itemArr[itemArr.length - 1], sortEvents);

        return newEvents;
    };

    componentDidMount = () => {
        this.isMonth() && (
            this.getRowLimit(),
            window.addEventListener('resize', this.getRowLimit)
        );
    }

    componentWillUnmount = () => {
        this.isMonth() && window.removeEventListener('resize', this.getRowLimit);
    };

    isMonth = () => {
        const { currentView } = this.props;

        return currentView === VIEW_TYPE.month;
    }
    
    getRowLimit = () => {
        const { useExtend } = this.props;

        if(useExtend) return;

        const rowHeight = this.row.current.clientHeight;
        const dateHeader = this.header.current.clientHeight;
        const eventSpace = rowHeight - dateHeader;
        const eventRow = this.eventRow.current && this.eventRow.current.clientHeight ? 
            this.eventRow.current.clientHeight : 0;
        const limit = eventRow === 0 ? 0 : Math.max(Math.floor(eventSpace / eventRow));

        
        if(limit > 0) {
            const { setLimit } = this.props;

            setLimit(limit);
        }
    };

    getDateSlotCustomize = () => {
        const { getCustomize } = this.props;
        
        return getCustomize([
            CUSTOMIZE.today, CUSTOMIZE.holiday, CUSTOMIZE.weekdays, 
            CUSTOMIZE.weekend, CUSTOMIZE.prevMonth, CUSTOMIZE.nextMonth
        ]);
    };

    getMorePosition = () => {
        const { getCustomize } = this.props;
        const { [CUSTOMIZE.more] : { position : { alignItems } } } = getCustomize([CUSTOMIZE.more]);


        return alignItems;
    };

    render() {
        const { 
            today, itemArr, events, onSelectSlot, isSelecting, currentView,
            stopSelecting, startSelecting, setSelectedStart, setSelectedEnd,
            selectedStart, selectedEnd, lastSelectedDate, setLastSelectedDate,
            defaultSelectedDate, onSelectEvent, limit, openPopup, useDateHeader,
            customizeList, moveDayView, useExtend, components
        } = this.props;
        const sortEvents = sortEventsUtil(events);
        const sameEventRow = this.sameEventRow(sortEvents);
        const dateSlotCustomize = this.getDateSlotCustomize();
        const newLimit =  limit !== 0 && this.getMorePosition() === 'flex-end' ? limit - 1 : limit;

        return (
            <div className={ styles.row } ref={ this.row }>
                <BackgroundRow itemArr={ itemArr } onSelectSlot={ onSelectSlot } isSelecting={ isSelecting }
                    stopSelecting={ stopSelecting } startSelecting={ startSelecting } setSelectedStart={ setSelectedStart }
                    setSelectedEnd={ setSelectedEnd } selectedStart={ selectedStart } selectedEnd={ selectedEnd }
                    lastSelectedDate={ lastSelectedDate } setLastSelectedDate={ setLastSelectedDate } defaultSelectedDate={ defaultSelectedDate }
                    limit={ limit } events={ sortEvents } openPopup={ openPopup } today={ today } customizeList={ customizeList }
                    useExtend={ useExtend } />
                <div className={ styles.dateContent }>
                    <div className={ styles.rowHeader } ref={ this.header }>
                        { 
                            useDateHeader && itemArr.map(item => (
                                <DateSlot key={ `${ item.type }_${ item.date.date() }` } 
                                    isToday={ today.isSame(item.date, 'date') } item={ item } customize={ dateSlotCustomize }
                                    moveDayView={ moveDayView } isSelecting={ isSelecting } startSelecting={ startSelecting } />
                            ))
                        }
                    </div>
                    <div className="eventBox">
                        {  
                            events && sameEventRow.map((event, idx) => {
                                if(currentView !== VIEW_TYPE.month || (newLimit === 0 || idx < newLimit)) {
                                    return (
                                        <EventRow eventRowRef={ this.eventRow } key={ `event-row_${ idx }` } 
                                            events={ event } slotStart={ itemArr[0] } slotEnd={ itemArr[itemArr.length - 1] } 
                                            onSelectEvent={ onSelectEvent } isSelecting={ isSelecting } startSelecting={ startSelecting }
                                            currentView={ currentView } components={ components } />
                                    );
                                } else {
                                    return null;
                                }
                            })
                        }
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
    customizeList : PropTypes.array.isRequired,
    defaultSelectedDate : PropTypes.instanceOf(moment),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
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
    getCustomize : PropTypes.func.isRequired,
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

export default withCustomize(CUSTOMIZE.view)(Row);