import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import DateSlot from '../DateSlot';
import EventRow from '../EventRow';
import BackgroundRow from '../BackgroundRow';
import moment from 'moment';
import styles from './styles.css';
import { VIEW_TYPE } from '../../variables';

class Row extends Component {
    row = createRef();
    header = createRef();
    eventRowParent = createRef();
    eventRow = createRef();

    sortEvents = () => {
        const { events } = this.props;

        if(!events) return [];

        const sortEvents = events.sort((a, b) => {
            const mAStart = moment(a.start);
            const mAEnd = moment(a.end);
            const mBStart = moment(b.start);
            const mBEnd = moment(b.end);

            if(mAStart < mBStart && mAEnd - mAStart > mBEnd - mBStart) {
                return -4;
            }
            
            if(mAStart < mBStart) {
                return -3;
            }
            
            // 시작 일정이 같은 날일 때, 일정의 길이가 긴 것이 우선순위
            if(mAStart.isSame(mBStart) && mAEnd - mAStart > mBEnd - mBStart) {
                return -1;
            }

            return 1;
        });

        return sortEvents;
    };

    sameEventRow = () => {
        const sortEvents = this.sortEvents();
        let newEvents = [];

        if(sortEvents.length > 1) {
            sortEvents.forEach((sortEvent, index, arr) => {
                // console.log('===================================');
                // console.log('arr : ', arr);
                // console.log('sortEvents : ', sortEvents, index);
                const nextEvent = arr[index + 1];
                // console.log('nextEvent : ', nextEvent);

                if(nextEvent) {
                    // console.log('nextEvent not empty');
                    const currentEvent = sortEvent;
                    // console.log('currentEvent : ', currentEvent);
                    const mCurrentStart = moment(currentEvent.start);
                    const mCurrentEnd = moment(currentEvent.end);
                    const mNextStart = moment(nextEvent.start);
                    const mNextEnd = moment(nextEvent.end);
                    
                    const lastEvent = newEvents[newEvents.length - 1];
                    // console.log('lastEvent : ', lastEvent);
                    // 앞 일정(currentEvent)과 겹치지 않는 일정일 경우
                    if(!mNextStart.isBetween(mCurrentStart, mCurrentEnd, null, '[]') && !mNextEnd.isBetween(mCurrentStart, mCurrentEnd, null, '[]')) {
                        // console.log('current newEvents : ', newEvents);
                        
                        if(lastEvent && lastEvent[lastEvent.length - 1].id === currentEvent.id) {
                            // console.log('lastEvent[lastEvent.length - 1].id === currentEvent.id true');
                            lastEvent.push(nextEvent);
                        } else {
                            // console.log('lastEvent[lastEvent.length - 1].id === currentEvent.id false');
                            newEvents.push([currentEvent, nextEvent]);
                            // newEvents.push([currentEvent]);
                            // newEvents.push([nextEvent]);
                        }
                    } else {
                        // 앞 일정(currentEvent)과 겹치는 일정일 경우
                        // console.log('mCurrentStart <= mNextStart, mNextEnd <= mCurrentEnd');
                        if(lastEvent && lastEvent[lastEvent.length - 1].id === currentEvent.id) {
                            // console.log('lastEvent[lastEvent.length - 1].id === currentEvent.id true');
                            newEvents.push([nextEvent]);
                        } else {
                            // console.log('lastEvent[lastEvent.length - 1].id === currentEvent.id false');
                            newEvents.push([currentEvent]);
                            newEvents.push([nextEvent]);
                        }
                    }
                }
                // console.log('===================================');
            });
        } else if(sortEvents.length === 1) {
            newEvents.push([sortEvents[0]]);
        }

        // console.log('newEvents : ', newEvents);

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
        const eventRow = this.eventRow.current && this.eventRow.current.clientHeight ? this.eventRow.current.clientHeight : 0;
        const limit = eventRow === 0 ? 0 : Math.max(Math.floor(eventSpace / eventRow));

        
        if(limit > 0) {
            const { setLimit } = this.props;

            setLimit(limit);
        }
    };

    render() {
        const { 
            today, itemArr, events, onSelectSlot, isSelecting, currentView,
            stopSelecting, startSelecting, setSelectedStart, setSelectedEnd,
            selectedStart, selectedEnd, lastSelectedDate, setLastSelectedDate,
            defaultSelectedDate, onSelectEvent, limit, openPopup, useDateHeader,
            customizeRow : { BackgroundCell, More, holiday, today : customizeToday, weekdays, weekend, prevMonth, nextMonth }
        } = this.props;

        const sameEventRow = this.sameEventRow();

        return (
            <div className={ styles.row } ref={ this.row }>
                <BackgroundRow itemArr={ itemArr } onSelectSlot={ onSelectSlot } isSelecting={ isSelecting }
                    stopSelecting={ stopSelecting } startSelecting={ startSelecting } setSelectedStart={ setSelectedStart }
                    setSelectedEnd={ setSelectedEnd } selectedStart={ selectedStart } selectedEnd={ selectedEnd }
                    lastSelectedDate={ lastSelectedDate } setLastSelectedDate={ setLastSelectedDate } defaultSelectedDate={ defaultSelectedDate }
                    limit={ limit } events={ events } openPopup={ openPopup } today={ today } customizeBackgroundRow={{ BackgroundCell, More, customizeToday, weekdays, holiday, weekend, prevMonth, nextMonth }} />
                <div className={ styles.dateContent }>
                    <div className={ styles.rowHeader } ref={ this.header }>
                        { 
                            useDateHeader && itemArr.map(item => (
                                <DateSlot key={ `${ item.type }_${ item.date.date() }` } isToday={ today.isSame(item.date, 'date') } item={ item }
                                    customizeDateSlot={{ customizeToday, holiday, weekend, weekdays, prevMonth, nextMonth }} />
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

export default Row;