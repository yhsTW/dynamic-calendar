import React from 'react';
import PropTypes from 'prop-types';
import TimeHeader from '../TimeHeader';
import TimeContent from '../TimeContent';
import moment from 'moment';
import { MONTH_TYPE, WEEK_NUM, VIEW_TYPE } from '../../utils/constants';
import styles from './styles.css';
import { getSunday } from '../../utils/dateUtil';
import { resetTime } from '../../utils/resetTime';

const TimeGrid = ({ today, currentDate, events, onSelectSlot, onSelectEvent, currentView, selectable, useExtend, customize, eventProperty, eventProperty : { start : startKey, end : endKey, allDay : allDayKey } }) => {
    const setWeekObj = (date, type) => {
        return { date : resetTime(date), type };
    };

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
                ? MONTH_TYPE.prev : MONTH_TYPE.next;
            
            pushArr(arr, setWeekObj(current, type));
        }
    };

    // week, day에 맞게 주(week) 배열을 가져온다.
    const getWeekArr = () => {
        let weekArr = [];

        if(currentView === VIEW_TYPE.week) {
            setWeek(weekArr);
        } else if(currentView === VIEW_TYPE.day) {
            pushArr(weekArr, setWeekObj(currentDate, MONTH_TYPE.current));
        }

        return weekArr;
    };

    const weekArr = getWeekArr();
    
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

    const checkAllDay = event => {
        let allDay = false;

        if(typeof allDayKey === 'string') {
            allDay = event[allDayKey];
        } else {
            allDay = event[allDayKey.key] === allDayKey.allDayType;
        }

        return allDay;
    };

    // 종일 일정 목록을 가져온다.
    const getAllDayEvents = () => {
        const weekEvents = getWeekEvents();
        let allDayEvents = [];

        if(!weekEvents) return allDayEvents;

        allDayEvents = weekEvents.filter(event => {
            let result = false;

            if(currentView === VIEW_TYPE.week) {
                result = checkAllDay(event) || (!checkAllDay(event) && !moment(event[startKey]).isSame(event[endKey], 'date', '[]'));
            } else if(currentView === VIEW_TYPE.day) {
                result = (checkAllDay(event) && moment(currentDate).isBetween(event[startKey], event[endKey], 'date', '[]')) ||
                    (!checkAllDay(event) && (!moment(event[startKey]).isSame(event[endKey], 'date', '[]') && moment(currentDate).isBetween(event[startKey], event[endKey], 'date', '[]')));
            }

            return result && event;
        });

        return allDayEvents;
    };

    // 종일 일정이 아닌 일정 목록을 가져온다.
    const getNotAllDayEvents = () => {
        const weekEvents = getWeekEvents();

        return weekEvents ? weekEvents.filter(event => 
            (!checkAllDay(event) && moment(event[startKey]).isSame(event[endKey], 'date')) && event
        ) : [];
    };

    return (
        <div className={ styles.week }>
            <TimeHeader today={ today } currentView={ currentView } weekArr={ weekArr }
                onSelectSlot={ onSelectSlot } events={ getAllDayEvents() } onSelectEvent={ onSelectEvent }
                selectable={ selectable } useExtend={ useExtend } customize={ customize } eventProperty={ eventProperty } />
            <TimeContent today={ today } currentDate={ currentDate } currentView={ currentView } 
                events={ getNotAllDayEvents() } onSelectSlot={ onSelectSlot }
                onSelectEvent={ onSelectEvent } weekArr={ weekArr } selectable={ selectable }
                customize={ customize } eventProperty={ eventProperty } />
        </div>
    );
};

TimeGrid.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]),
    events : PropTypes.arrayOf(PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number,
            title : PropTypes.string,
            start : PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.instanceOf(moment), PropTypes.number, PropTypes.string]), 
            end : PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.instanceOf(moment), PropTypes.number, PropTypes.string]), 
            color : PropTypes.string,
            allDay : PropTypes.bool
        })
    )),
    selectable : PropTypes.bool.isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day])),
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
    }),
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired
};

export default TimeGrid;