import React from 'react';
import TimeHeader from '../TimeHeader';
import TimeContent from '../TimeContent';
import moment from 'moment';
import { MONTH_TYPE, WEEK_NUM, VIEW_TYPE } from '../../utils/constants';
import styles from './styles.css';
import { getSunday } from '../../utils/dateUtil';

const TimeGrid = ({ today, currentDate, events, onSelectSlot, onSelectEvent, currentView, selectable }) => {
    const pushArr = (arr, data) => {
        arr.push(data);
    };

    const setWeek = arr => {
        const sunday = getSunday(currentDate);

        for(let i = 0; i < WEEK_NUM; i++) {
            const current = moment(sunday).date(sunday.date() + i);

            const type = currentDate.month() === current.month() ? 
                MONTH_TYPE.current : currentDate.month() > current.month() 
                ? MONTH_TYPE.prev : MONTH_TYPE.next
            pushArr(arr, { date : current, type });
        }
    };

    const getWeekArr = () => {
        let weekArr = [];

        if(currentView === VIEW_TYPE.week) {
            setWeek(weekArr);
        } else if(currentView === VIEW_TYPE.day) {
            pushArr(weekArr, { date : currentDate, type : MONTH_TYPE.current });
        }

        return weekArr;
    };

    const getWeek = () => {
        const firstWeek = moment(currentDate).startOf('month').week();
        const currentWeek = moment(currentDate).month() === 11 && moment(currentDate).week() === 1 ? (
            moment(currentDate).weeksInYear() + moment(currentDate).endOf('month').week()
        ) : moment(currentDate).week();
        
        return currentWeek - firstWeek;
    };

    const getWeekEvents = () => {
        return events[getWeek()];
    };

    const getAllDayEvents = () => {
        const weekEvents = getWeekEvents();

        return weekEvents ? weekEvents.filter(event => 
            (event.allDay || !moment(event.start).isSame(event.end, 'date')) && event
        ) : [];
    };

    const getNotAllDayEvents = () => {
        const weekEvents = getWeekEvents();

        return weekEvents ? weekEvents.filter(event => 
            !event.allDay && moment(event.start).isSame(event.end, 'date') && event
        ) : [];
    };

    const weekArr = getWeekArr();
    
    return (
        <div className={ styles.week }>
            <TimeHeader today={ today } currentView={ currentView } weekArr={ weekArr }
                onSelectSlot={ onSelectSlot } events={ getAllDayEvents() } onSelectSlot={ onSelectSlot }
                onSelectEvent={ onSelectEvent } />
            <TimeContent today={ today } currentDate={ currentDate } currentView={ currentView } 
                conSelectSlot={ onSelectSlot } events={ getNotAllDayEvents() } onSelectSlot={ onSelectSlot }
                onSelectEvent={ onSelectEvent } weekArr={ weekArr } selectable={ selectable } />
        </div>
    );
};

export default TimeGrid;