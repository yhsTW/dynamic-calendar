import React from 'react';
import PropTypes from 'prop-types';
import TimeHeader from '../TimeHeader';
import TimeContent from '../TimeContent';
import moment from 'moment';
import { MONTH_TYPE, WEEK_NUM, VIEW_TYPE } from '../../utils/constants';
import styles from './styles.css';
import { getSunday } from '../../utils/dateUtil';

const TimeGrid = ({ today, currentDate, events, onSelectSlot, onSelectEvent, currentView, selectable }) => {
    // 전달받은 배열에 data를 집어넣는다.
    const pushArr = (arr, data) => {
        arr.push(data);
    };

    // 일주일의 날짜 정보를 집어 넣는다.
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

    // week, day에 맞게 주(week) 배열을 가져온다.
    const getWeekArr = () => {
        let weekArr = [];

        if(currentView === VIEW_TYPE.week) {
            setWeek(weekArr);
        } else if(currentView === VIEW_TYPE.day) {
            pushArr(weekArr, { date : currentDate, type : MONTH_TYPE.current });
        }

        return weekArr;
    };

    // 현재의 주(week)가 현재의 월(month)의 기준으로 몇 번째 주인지 확인한다.
    const getWeek = () => {
        const firstWeek = moment(currentDate).startOf('month').week();
        const currentWeek = moment(currentDate).month() === 11 && moment(currentDate).week() === 1 ? (
            moment(currentDate).weeksInYear() + moment(currentDate).endOf('month').week()
        ) : moment(currentDate).week();
        
        return currentWeek - firstWeek;
    };

    // 현재의 주(week)에 맞는 일정 리스트를 가져온다.
    const getWeekEvents = () => {
        return events[getWeek()];
    };

    // 종일 일정 목록을 가져온다.
    const getAllDayEvents = () => {
        const weekEvents = getWeekEvents();

        return weekEvents ? weekEvents.filter(event => 
            (event.allDay || !moment(event.start).isSame(event.end, 'date')) && event
        ) : [];
    };

    // 종일 일정이 아닌 일정 목록을 가져온다.
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
                onSelectSlot={ onSelectSlot } events={ getAllDayEvents() }
                onSelectEvent={ onSelectEvent } selectable={ selectable } />
            <TimeContent today={ today } currentDate={ currentDate } currentView={ currentView } 
                events={ getNotAllDayEvents() } onSelectSlot={ onSelectSlot }
                onSelectEvent={ onSelectEvent } weekArr={ weekArr } selectable={ selectable } />
        </div>
    );
};

TimeGrid.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]),
    events : PropTypes.arrayOf(PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            title : PropTypes.string.isRequired,
            start : PropTypes.instanceOf(Date).isRequired,
            end : PropTypes.instanceOf(Date).isRequired,
            color : PropTypes.string,
            allDay : PropTypes.bool
        })
    )).isRequired,
    selectable : PropTypes.bool.isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day])),
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired
};

export default TimeGrid;