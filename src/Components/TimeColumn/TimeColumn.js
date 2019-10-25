import React from 'react';
import TimeSlot from '../TimeSlot';
import withSelection from '../../hoc/withSelection';
import EventBar from '../EventBar';
import styles from './styles.css';
import moment from 'moment';
import { makeTimeFormat } from '../../utils/utils';

const TimeColumn = ({ itemArr, week, customizeTimeColumn, select, onSelectSlot, onSelectEvent, currentView, events }) => {
    const getEventBarHeight = event => {
        const start = moment(event.start);
        const end = moment(event.end);
        const hour = (end.hour() - start.hour()) * 60;
        const min = start.minute() + end.minute();
        const gap = (hour + min) / 30;
        
        // 30분 때문에
        return `calc((100% * ${ gap })/${ itemArr.length * 2 })`;
    };

    const getEventBarTop = event => {
        const startHour = moment(event.start).hour();

        return `calc((100% * ${ (startHour * 60) / 30 }) / ${ itemArr.length * 2 })`;
    };

    const sortEvents = () => {
        const newEvents = [ ...events ];

        return newEvents.sort((a, b) => {
            // 시작시간이 이전이고, 종료시간이 이후인 일정
            if(moment(a.start).isBefore(b.start) && moment(a.end).isAfter(b.end)) 
                return -4;

            // 시작 시간이 이전인 일정
            if(moment(a.start).isBefore(b.start)) 
                return -3;

            // 시작시간이 같으나, 끝 시간이 이후인 일정
            if(moment(a.start).isSame(b.start) && moment(a.end).isAfter(b.end)) 
                return -2;

            return 1;
        });
    };

    const isBetween = (date, rangeDate) => {
        return moment(date).isBetween(rangeDate.start, rangeDate.end, null, '[)');
    };

    const getEventLevel = (event, group) => {
        let eventLevel = 1;

        const filterEvents = group.filter(current => (
            isBetween(event.start, current) || isBetween(event.end, current)
        ) && current);

        return eventLevel + filterEvents.length;
    };

    const getStyle = (length, eventLevel, last) => {

        let width = 100,
            left = 0;
            
        if(!last && length > 1) width = (width / length) * 1.7;
        if(eventLevel > 1) left = `calc((100% / ${ length }) * ${ eventLevel - 1 })`;
        if(length > 1 && last) width = `calc(${ width }% - ${ left })`;

        return {
            width : width.toString().includes('calc') ? width : `${ width }%`,
            left
        };
    };

    const makeStyle = eventGroup => {
        let returnGroup = [];

        for(let i = 0; i < eventGroup.length; i++) {
            const currentGroup = eventGroup[i];
            let currentLevel = 1;

            for(let j = 0; j < currentGroup.length; j++) {
                const currentEvent = currentGroup[j];
                const last = currentGroup.length - 1 === j;

                if(j > 0) currentLevel = getEventLevel(currentEvent, currentGroup.slice(0, j));

                const style = getStyle(currentGroup.length, currentLevel, last);
                let newEvent = {
                    ...currentEvent,
                    style
                };

                returnGroup.push(newEvent);
            }
        }

        return returnGroup;
    };

    const makeLayout = () => {
        if(!events) return;

        const sEvents = sortEvents(events);
        let notOverlap = [];
        let overlap = [];

        while(sEvents.length > 0) {
            const currentEvent = sEvents.shift();
            const overlapEvents = sEvents.filter(event => (
                (
                    isBetween(event.start, currentEvent) || isBetween(event.end, currentEvent)
                ) && event
            ));
            
            if(overlapEvents.length > 0) {
                for(let i = 0; i < overlapEvents.length; i++) {
                    sEvents.splice(sEvents.indexOf(overlapEvents[i]), 1);
                }
                overlap.push([currentEvent, ...overlapEvents]);
            } else {
                notOverlap.push([currentEvent]);
            }
        }

        let eventGroup = makeStyle([...notOverlap, ...overlap]);
        
        return eventGroup;
    };

    return (
        <div className={ styles.timeColumn }>
            <div className={ styles.backgroundColumn }>
                {
                    itemArr.map((item, index) => (
                        <TimeSlot key={ `${ item[0].date }${ week ? `_${ week.date }` : '' }_${ index }` } items={ item } week={ week } 
                            customizeTimeSlot={ customizeTimeColumn } select={ select } onSelectSlot={ onSelectSlot }
                            onSelectEvent={ onSelectEvent } currentView={ currentView } />
                    ))
                }
            </div>
            <div className={ styles.contentColumn }>
                {
                    week && events && makeLayout().map(event => 
                        <EventBar key={ event.id } event={ event } isStart={ true } isEnd={ true } isSelecting={ select.isSelecting }
                            startSelecting={ select.startSelecting } width={ event.style.width } onSelectEvent={ onSelectEvent }
                            height={ getEventBarHeight(event) } top={ getEventBarTop(event) } useTime={ true }
                            time={ `${ makeTimeFormat(event.start) } - ${ makeTimeFormat(event.end) }` } left={ `${ event.style.left }` } />
                    )
                }
            </div>
        </div>
    );
};

export default withSelection(TimeColumn);