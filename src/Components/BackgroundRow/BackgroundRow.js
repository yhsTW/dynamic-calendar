import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackgroundCell from '../BackgroundCell';
import moment from 'moment';
import styles from './styles.css';
import { CUSTOMIZE } from '../../utils/constants';

class BackgroundRow extends Component {
    // Slot별로 event의 갯수를 센다.
    settingEventCount = () => {
        let eventCountArr = [];
        const { events, itemArr, eventProperty : { start : startKey, end : endKey } } = this.props;

        if(events) {
            const startSlot = itemArr[0].date;
            const endSlot = itemArr[itemArr.length - 1].date;

            events.forEach(event => {
                const eStart = event[startKey];
                const eEnd = event[endKey];
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
        const { customize : { today, holiday, weekdays, weekend, prevMonth, nextMonth, BackgroundCell, More } } = this.props;

        return {
            today,
            holiday,
            weekdays,
            weekend,
            prevMonth,
            nextMonth,
            BackgroundCell,
            More
        };
    };

    getAlignItems = customize => {
        return customize[CUSTOMIZE.more] && customize[CUSTOMIZE.more].position.alignItems;
    };
    
    render() {
        const { 
            itemArr, onSelectSlot, isSelecting, stopSelecting, startSelecting,
            setSelectedStart, setSelectedEnd, selectedStart, selectedEnd,
            lastSelectedDate, setLastSelectedDate, defaultSelectedDate, limit,
            openPopup, today, useExtend, currentView, usePopup
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

                        if(current) {
                            if(current.more > limit) {
                                if(!useExtend) {
                                    isMore = true;
                                    more = alignItems === 'flex-end' ? current.more - (limit - 1) : current.more - limit;
                                }
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
                                isToday={ today.isSame(item.date, 'date') } customize={ customize } currentView={ currentView }
                                usePopup={ usePopup } />
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
        id : PropTypes.number,
        title : PropTypes.string,
        start : PropTypes.instanceOf(Date),
        end : PropTypes.instanceOf(Date),
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
    onSelectSlot : PropTypes.func.isRequired,
    openPopup : PropTypes.func.isRequired,
    setLastSelectedDate : PropTypes.func.isRequired,
    setSelectedStart : PropTypes.func.isRequired,
    setSelectedEnd : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired,
    stopSelecting : PropTypes.func.isRequired
};

export default BackgroundRow;