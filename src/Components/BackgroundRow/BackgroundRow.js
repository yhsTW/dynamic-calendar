import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackgroundCell from '../BackgroundCell';
import moment from 'moment';
import styles from './styles.css';

class BackgroundRow extends Component {
    // Slot별로 event의 갯수를 센다.
    settingEventCount = () => {
        let eventCountArr = [];
        const { events, itemArr } = this.props;

        if(events) {
            const startSlot = itemArr[0].date;
            const endSlot = itemArr[itemArr.length - 1].date;

            events.forEach(event => {
                const { start : eStart, end : eEnd } = event;
                const mStart = moment(eStart);
                const mEnd = moment(eEnd);
                const start = mStart.isBefore(startSlot) ? startSlot : mStart;
                const end = mEnd.isAfter(endSlot) ? endSlot : mEnd;
                
                for(let i = start.day(); i <= end.day(); i++) {
                    if(eventCountArr[i]) {
                        eventCountArr[i] = { events : [...eventCountArr[i].events, event], more : eventCountArr[i].more + 1 };
                    } else {
                        eventCountArr[i] = { events : [event], more : 1 };
                    }
                }
            });
        }

        return eventCountArr;
    }

    render() {
        const { 
            itemArr, onSelectSlot, isSelecting, stopSelecting, startSelecting,
            setSelectedStart, setSelectedEnd, selectedStart, selectedEnd,
            lastSelectedDate, setLastSelectedDate, defaultSelectedDate, limit,
            openPopup, today, customizeBackgroundRow
        } = this.props;

        const eventCountArr = this.settingEventCount();

        return (
            <div className={ styles.backgroundRow }>
                { 
                    itemArr.map((item, idx) => {
                        const current = eventCountArr[idx];
                        let isMore = false;
                        let more = 0;
                        let events = [];
                        
                        if(current && current.more > limit) {
                            isMore = true;
                            more = current.more - limit;
                            events = current.events
                        }

                        return (
                            <BackgroundCell key={ item.date } item={ item } onSelectSlot={ onSelectSlot }
                                isSelecting={ isSelecting } stopSelecting={ stopSelecting } startSelecting={ startSelecting }
                                setSelectedStart={ setSelectedStart } setSelectedEnd={ setSelectedEnd }
                                selectedStart={ selectedStart } selectedEnd={ selectedEnd } lastSelectedDate={ lastSelectedDate }
                                setLastSelectedDate={ setLastSelectedDate } defaultSelectedDate={ defaultSelectedDate }
                                isMore={ isMore } events={ events } more={ more } openPopup={ openPopup }
                                isToday={ today.isSame(item.date, 'date') } customizeBackgroundCell={ customizeBackgroundRow } />
                        );
                    })
                }
            </div>
        )
    }
}

BackgroundRow.propTypes = {
    defaultSelectedDate : PropTypes.instanceOf(moment),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired
    })),
    isSelecting : PropTypes.bool.isRequired,
    itemArr : PropTypes.arrayOf(PropTypes.shape({
        date : PropTypes.instanceOf(moment),
        type : PropTypes.string.isRequired
    })).isRequired,
    lastSelectedDate : PropTypes.instanceOf(moment),
    limit : PropTypes.number.isRequired,
    selectedStart : PropTypes.instanceOf(moment),
    selectedEnd : PropTypes.instanceOf(moment),
    today : PropTypes.instanceOf(moment),
    onSelectSlot : PropTypes.func,
    openPopup : PropTypes.func,
    setLastSelectedDate : PropTypes.func,
    setSelectedStart : PropTypes.func,
    setSelectedEnd : PropTypes.func,
    startSelecting : PropTypes.func,
    stopSelecting : PropTypes.func
};

export default BackgroundRow;