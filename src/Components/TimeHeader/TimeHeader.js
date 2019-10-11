import React from 'react';
import Label from '../Label';
import Row from '../Row';
import { VIEW_TYPE, MONTH_HEADER_DATA, WEEK_NUM, MONTH_TYPE } from '../../variables';
import moment from 'moment';
import styles from './styles.css';

// const TimeHeader = ({ today, currentDate, currentView, customizeTimeHeader : { BackgroundCell, customizeToday, holiday, weekend, weekdays }, select }) => {
const TimeHeader = ({ today, currentDate, currentView, customizeTimeHeader, select, onSelectSlot, events, onSelectEvent }) => {
    const getSunday = () => {
        const currentDay = currentDate.day();

        return moment(currentDate).date(currentDate.date() - currentDay);
    }

    const pushArr = (arr, data) => {
        arr.push(data);
    };

    const getWeekHeader = arr => {
        const sunday = getSunday();

        for(let i = 0; i < WEEK_NUM; i++) {
            const current = moment(sunday).date(sunday.date() + i);

            const type = currentDate.month() === current.month() ? MONTH_TYPE.current : currentDate.month() > current.month() ? MONTH_TYPE.prev : MONTH_TYPE.next
            pushArr(arr, { date : current, type });
        }
    };

    const getHeaders = () => {
        let headers = [];

        if(currentView === VIEW_TYPE.week) {
            getWeekHeader(headers);
        } else if(currentView === VIEW_TYPE.day) {
            pushArr(headers, { date : currentDate, type : MONTH_TYPE.current });
        }

        return headers;
    };

    const getAllDayEvents = (start, end) => {
        console.log('start, end : ', start, end);
        return events.filter(event => 
            (moment(event.start).isBetween(start, end, null, '[]') || moment(event.end).isBetween(start, end, null, '[]')) && event.allDay && event
        );
    };

    const headers = getHeaders();
    const allDayEvents = getAllDayEvents(moment(headers[0].date).set({ hour : 0, minute : 0, second : 0 }), moment(headers[headers.length - 1].date).set({ hour : 23, minute : 59, second : 59 }));
    
    return (
        <div className={ styles.timeHeader }>
            <div className={ styles.timeHeaderSegment }>
                <Label text="종일" />
            </div>
            <div className={ styles.timeHeaderContent }>
                <div className={ styles.timeHeaderHeaders }>
                    { 
                        headers.map(header => (
                            <Label key={ header.date } style={ header.date.isSame(today, 'date') ? customizeTimeHeader.today.dateHeaderStyle : {} } 
                                className={ styles.timeHeaderItem } text={ `${ header.date.date() } ${ MONTH_HEADER_DATA[header.date.day()] }` } />
                            )
                        )
                    }
                </div>
                <div className={ styles.timeHeaderAllDays }>
                    <Row today={ today } itemArr={ headers } { ...select } customizeRow={ customizeTimeHeader } useDateHeader={ false }
                        onSelectSlot={ onSelectSlot } events={ allDayEvents } currentView={ currentView } onSelectEvent={ onSelectEvent } />
                </div>
            </div>
        </div>
    );
};

export default TimeHeader;