import React from 'react';
import Label from '../Label';
import { VIEW_TYPE, MONTH_HEADER_DATA, WEEK_NUM } from '../../variables';
import moment from 'moment';
import styles from './styles.css';

const TimeHeader = ({ today, currentDate, currentView }) => {
    const getSunday = () => {
        const currentDay = currentDate.day();

        return moment(currentDate).date(currentDate.date() - currentDay);
    }

    const getWeekHeader = arr => {
        const sunday = getSunday();

        for(let i = 0; i < WEEK_NUM; i++) {
            const current = moment(sunday).date(sunday.date() + i);

            arr.push(`${ current.date() } ${ MONTH_HEADER_DATA[current.day()] }`);
        }
    };

    const getHeaders = () => {
        let headers = [];

        if(currentView === VIEW_TYPE.week) {
            getWeekHeader(headers);
        } else if(currentView === VIEW_TYPE.day) {
            headers.push(`${ currentDate.date() } ${ MONTH_HEADER_DATA[currentDate.day()] }`);
        }

        return headers;
    };

    return (
        <div className={ styles.timeHeader }>
            { getHeaders().map(header => <Label key={ header } text={ header } />) }
        </div>
    );
};

export default TimeHeader;