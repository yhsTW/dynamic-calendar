import React from 'react';
import TimeSlot from '../TimeSlot';
import styles from './styles.css';

const TimeColumn = ({ itemArr, week, customizeTimeColumn, select, onSelectSlot, onSelectEvent }) => {
    
    return (
        <div className={ styles.timeColumn }>
            { 
                itemArr.map(item => (
                    <TimeSlot key={ `${ item[0].date }${ week ? `_${ week.date }` : '' }` } items={ item } week={ week } 
                        customizeTimeSlot={ customizeTimeColumn } select={ select } onSelectSlot={ onSelectSlot }
                        onSelectEvent={ onSelectEvent } />
                )) 
            }
        </div>
    );
};

export default TimeColumn;