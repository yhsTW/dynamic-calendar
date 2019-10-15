import React from 'react';
import TimeHeader from '../TimeHeader';
import TimeContent from '../TimeContent';
import moment from 'moment';
import { MONTH_TYPE, WEEK_NUM, VIEW_TYPE } from '../../variables';
import styles from './styles.css';

const TimeGrid = ({ today, currentDate, events, onSelectSlot, onSelectEvent, customizeView, currentView }) => {
    const getSunday = () => {
        const currentDay = currentDate.day();

        return moment(currentDate).date(currentDate.date() - currentDay);
    };

    const pushArr = (arr, data) => {
        arr.push(data);
    };

    const setWeek = arr => {
        const sunday = getSunday();

        for(let i = 0; i < WEEK_NUM; i++) {
            const current = moment(sunday).date(sunday.date() + i);

            const type = currentDate.month() === current.month() ? MONTH_TYPE.current : currentDate.month() > current.month() ? MONTH_TYPE.prev : MONTH_TYPE.next
            pushArr(arr, { date : current, type });
        }
    };

    const getWeek = () => {
        let weekArr = [];

        if(currentView === VIEW_TYPE.week) {
            setWeek(weekArr);
        } else if(currentView === VIEW_TYPE.day) {
            pushArr(weekArr, { date : currentDate, type : MONTH_TYPE.current });
        }

        return weekArr;
    };

    const weekArr = getWeek();
    
    return (
        <div className={ styles.week }>
            <TimeHeader today={ today } currentView={ currentView } weekArr={ weekArr }
                customizeTimeHeader={customizeView} onSelectSlot={ onSelectSlot }
                events={ events } onSelectSlot={ onSelectSlot } onSelectEvent={ onSelectEvent } />
            <TimeContent today={ today } currentDate={ currentDate } currentView={ currentView } 
                customizeTimeContent={customizeView} onSelectSlot={ onSelectSlot }
                events={ events } onSelectSlot={ onSelectSlot } onSelectEvent={ onSelectEvent }
                weekArr={ weekArr } />
        </div>
    );
};

export default TimeGrid;