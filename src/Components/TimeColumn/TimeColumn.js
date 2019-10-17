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
        return `calc((100% * ${ gap })/${ (itemArr.length - 1) * 2 })`;
    };

    const getEventBarTop = event => {
        const startHour = moment(event.start).hour();

        return `calc((100% * ${ (startHour * 60) / 30 }) / ${ itemArr.length * 2 })`;
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
                    week && events && events.map(event => (
                        <EventBar key={ event.id } event={ event } isStart={ true } isEnd={ true } isSelecting={ select.isSelecting }
                            startSelecting={ select.startSelecting } width={ '90%' } onSelectEvent={ onSelectEvent }
                            height={ getEventBarHeight(event) } top={ getEventBarTop(event) } useTime={ true } 
                            time={ `${ makeTimeFormat(event.start) } - ${ makeTimeFormat(event.end) }` } />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default withSelection(TimeColumn);