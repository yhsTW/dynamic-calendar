import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackgroundCell from '../BackgroundCell';
import moment from 'moment';
import styles from './styles.css';
import withCustomize from '../../hoc/withCustomize';
import { CUSTOMIZE } from '../../utils/constants';

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
    };
    
    // BackgroundCell에서 하면,
    // Cell마다 동일한 스타일을 여러번 불러와야 하니
    // BackgroundRow에서 가져와 각 BackgroundCell에 넘겨준다.
    getBackgroundCustomize = () => {
        const { getCustomize, customizeList } = this.props;
        
        return getCustomize(customizeList);
    };

    getAlignItems = customize => {
        return customize[CUSTOMIZE.more] && customize[CUSTOMIZE.more].position.alignItems;
    };
    
    render() {
        const { 
            itemArr, onSelectSlot, isSelecting, stopSelecting, startSelecting,
            setSelectedStart, setSelectedEnd, selectedStart, selectedEnd,
            lastSelectedDate, setLastSelectedDate, defaultSelectedDate, limit,
            openPopup, today, useExtend
        } = this.props;
        const eventCountArr = this.settingEventCount();
        const customize = this.getBackgroundCustomize();
        const alignItems = this.getAlignItems(customize);

        return (
            <div className={ styles.backgroundRow }>
                { 
                    itemArr.map((item, idx) => {
                        const current = eventCountArr[idx];
                        let isMore = false;
                        let more = 0;
                        let events = [];

                        if(current && current.more > limit) {
                            if(!useExtend) {
                                isMore = true;
                                more = alignItems === 'flex-end' ? current.more - (limit - 1) : current.more - limit;
                            }
                            events = current.events
                        }

                        return (
                            <BackgroundCell key={ item.date } item={ item } onSelectSlot={ onSelectSlot }
                                isSelecting={ isSelecting } stopSelecting={ stopSelecting } startSelecting={ startSelecting }
                                setSelectedStart={ setSelectedStart } setSelectedEnd={ setSelectedEnd }
                                selectedStart={ selectedStart } selectedEnd={ selectedEnd } lastSelectedDate={ lastSelectedDate }
                                setLastSelectedDate={ setLastSelectedDate } defaultSelectedDate={ defaultSelectedDate }
                                isMore={ isMore } events={ events } more={ more } openPopup={ openPopup }
                                isToday={ today.isSame(item.date, 'date') } customize={ customize } />
                        );
                    })
                }
            </div>
        )
    }
}

BackgroundRow.propTypes = {
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
    itemArr : PropTypes.arrayOf(PropTypes.shape({
        date : PropTypes.instanceOf(moment),
        type : PropTypes.string.isRequired
    })).isRequired,
    lastSelectedDate : PropTypes.instanceOf(moment),
    limit : PropTypes.number,
    selectedEnd : PropTypes.instanceOf(moment),
    selectedStart : PropTypes.instanceOf(moment),
    today : PropTypes.instanceOf(moment),
    useExtend : PropTypes.bool.isRequired,
    getCustomize : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired,
    openPopup : PropTypes.func.isRequired,
    setLastSelectedDate : PropTypes.func.isRequired,
    setSelectedStart : PropTypes.func.isRequired,
    setSelectedEnd : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired,
    stopSelecting : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.view)(BackgroundRow);