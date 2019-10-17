import React from 'react';
import Label from '../Label';
import { MONTH_HEADER_DATA } from '../../variables';
import styles from './styles.css';
import TimeAllDay from '../TimeAllDay/TimeAllDay';

const TimeHeader = ({ today, weekArr, currentView, customizeTimeHeader, onSelectSlot, events, onSelectEvent }) => {
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
                <TimeAllDay today={ today } itemArr={ weekArr } customizeRow={ customizeTimeHeader } useDateHeader={ false }
                    onSelectSlot={ onSelectSlot } events={ events } currentView={ currentView } onSelectEvent={ onSelectEvent } />
            </div>
        </div>
    );
};

export default TimeHeader;