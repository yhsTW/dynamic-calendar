import React from 'react';
import Label from '../Label';
import Row from '../Row';
import { MONTH_HEADER_DATA } from '../../variables';
import moment from 'moment';
import styles from './styles.css';
import withSelection from '../../hoc/withSelection';

const TimeHeader = ({ today, weekArr, currentView, customizeTimeHeader, select, onSelectSlot, events, onSelectEvent }) => {
    const getAllDayEvents = (start, end) => {
        return events.filter(event => 
            (moment(event.start).isBetween(start, end, null, '[]') || 
            moment(event.end).isBetween(start, end, null, '[]')) && 
            event.allDay && 
            event
        );
    };

    const allDayEvents = getAllDayEvents(
        moment(weekArr[0].date).set({ hour : 0, minute : 0, second : 0 }), 
        moment(weekArr[weekArr.length - 1].date).set({ hour : 23, minute : 59, second : 59 })
    );
    
    return (
        <div className={ styles.timeHeader }>
            <div className={ styles.timeHeaderSegment }>
                <Label text="종일" />
            </div>
            <div className={ styles.timeHeaderContent }>
                <div className={ styles.timeHeaderHeaders }>
                    { 
                        weekArr.map(week => (
                            <Label key={ week.date } style={ week.date.isSame(today, 'date') ? customizeTimeHeader.today.dateHeaderStyle : {} } 
                                className={ styles.timeHeaderItem } text={ `${ week.date.date() } ${ MONTH_HEADER_DATA[week.date.day()] }` } />
                            )
                        )
                    }
                </div>
                <div className={ styles.timeHeaderAllDays }>
                    <Row today={ today } itemArr={ weekArr } { ...select } customizeRow={ customizeTimeHeader } useDateHeader={ false }
                        onSelectSlot={ onSelectSlot } events={ allDayEvents } currentView={ currentView } onSelectEvent={ onSelectEvent } />
                </div>
            </div>
        </div>
    );
};

export default withSelection(TimeHeader);