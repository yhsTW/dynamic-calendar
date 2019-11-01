import React from 'react';
import styles from './styles.css';
import TimeColumn from '../TimeColumn';
import getTimeArr from '../../utils/getTimeArr';
import moment from 'moment'

const TimeContent = ({ currentDate, today, weekArr, currentView, onSelectSlot, events, onSelectEvent, selectable }) => {

    const timeArr = getTimeArr();
    const sortEvents = () => {
        let newEvents = [];

        events.forEach(event => {
            const idx = moment(event.start).day();

            if(!newEvents[idx]) {
                newEvents[idx] = [];
            }

            newEvents[moment(event.start).day()].push(event);
        });

        return newEvents;
    };

    const newEvents = sortEvents();

    return (
        <div className={ styles.timeContent }>
            <div className={ styles.timeContentHeader }>
                <TimeColumn itemArr={ timeArr } />
            </div>
            <div className={ styles.timeContents }>
                { 
                    weekArr.map(week => (
                        <TimeColumn key={ `${ week.date }_${ week.type }` } itemArr={ timeArr } week={ week } 
                            onSelectSlot={ onSelectSlot } onSelectEvent={ onSelectEvent } currentView={ currentView }
                            events={ newEvents[week.date.day()] } selectable={ selectable } />
                    ))
                }
            </div>
        </div>
    );
};

export default TimeContent;