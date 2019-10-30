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
    eventRowParent = createRef();
    eventRow = createRef();

    sameEventRow = (sortEvents) => {
        const { itemArr } = this.props;
        let newEvents = eventLevel(itemArr[0], itemArr[itemArr.length - 1], sortEvents);

        return newEvents;
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     const { limit } = this.state;
    //     const { events, isSelecting } = this.props;

    //     if(events === nextProps.events || isSelecting === nextProps.isSelecting || limit === nextState.limit) {
    //         return false;
    //     }

    //     return true;
    // }

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

    render() {
        const { 
            today, itemArr, events, onSelectSlot, isSelecting, currentView,
            stopSelecting, startSelecting, setSelectedStart, setSelectedEnd,
            selectedStart, selectedEnd, lastSelectedDate, setLastSelectedDate,
            defaultSelectedDate, onSelectEvent, limit, openPopup, useDateHeader,
            customizeList
        } = this.props;
        const sortEvents = sortEventsUtil(events);
        const sameEventRow = this.sameEventRow(sortEvents);
        const dateSlotCustomize = this.getDateSlotCustomize();

        return (
            <div className={ styles.row } ref={ this.row }>
                <BackgroundRow itemArr={ itemArr } onSelectSlot={ onSelectSlot } isSelecting={ isSelecting }
                    stopSelecting={ stopSelecting } startSelecting={ startSelecting } setSelectedStart={ setSelectedStart }
                    setSelectedEnd={ setSelectedEnd } selectedStart={ selectedStart } selectedEnd={ selectedEnd }
                    lastSelectedDate={ lastSelectedDate } setLastSelectedDate={ setLastSelectedDate } defaultSelectedDate={ defaultSelectedDate }
                    limit={ limit } events={ sortEvents } openPopup={ openPopup } today={ today } customizeList={ customizeList } />
                <div className={ styles.dateContent }>
                    <div className={ styles.rowHeader } ref={ this.header }>
                        { 
                            useDateHeader && itemArr.map(item => (
                                <DateSlot key={ `${ item.type }_${ item.date.date() }` } 
                                    isToday={ today.isSame(item.date, 'date') } item={ item } customizeDateSlot={ dateSlotCustomize } />
                            ))
                        }
                    </div>
                    <div className="eventBox">
                        {  
                            events && sameEventRow.map((event, idx) => {
                                if(currentView !== VIEW_TYPE.month || (limit === 0 || idx < limit)) {
                                    return (
                                        <EventRow ref={ this.eventRowParent } eventRowRef={ this.eventRow } key={ `event-row_${ idx }` } 
                                            events={ event } slotStart={ itemArr[0] } slotEnd={ itemArr[itemArr.length - 1] } 
                                            onSelectEvent={ onSelectEvent } isSelecting={ isSelecting } startSelecting={ startSelecting }
                                            currentView={ currentView } />
                                    )
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
    defaultSelectedDate : PropTypes.instanceOf(moment),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
        color : PropTypes.string,
        allDay : PropTypes.bool.isRequired
    })),
    isSelecting : PropTypes.bool.isRequired,
    itemArr : PropTypes.arrayOf( PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.string.isRequired
    }).isRequired).isRequired,
    lastSelectedDate : PropTypes.instanceOf(moment),
    limit : PropTypes.number,
    selectedStart : PropTypes.instanceOf(moment),
    selectedEnd : PropTypes.instanceOf(moment),
    today : PropTypes.instanceOf(moment).isRequired,
    useDateHeader : PropTypes.bool,
    onSelectEvent : PropTypes.func,
    onSelectSlot : PropTypes.func,
    openPopup : PropTypes.func,
    setLastSelectedDate : PropTypes.func,
    setLimit : PropTypes.func,
    setSelectedStart : PropTypes.func.isRequired,
    setSelectedEnd : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired,
    stopSelecting : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.view)(Row);