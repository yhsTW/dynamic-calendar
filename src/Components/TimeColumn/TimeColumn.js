import React from 'react';
import TimeSlot from '../TimeSlot';
import withSelection from '../../hoc/withSelection';
import styles from './styles.css';

const TimeColumn = ({ itemArr, week, customizeTimeColumn, select, onSelectSlot, onSelectEvent, currentView }) => (
    <div className={ styles.timeColumn }>
        { 
            itemArr.map((item, index) => (
                <TimeSlot key={ `${ item[0].date }${ week ? `_${ week.date }` : '' }_${ index }` } items={ item } week={ week } 
                    customizeTimeSlot={ customizeTimeColumn } select={ select } onSelectSlot={ onSelectSlot }
                    onSelectEvent={ onSelectEvent } currentView={ currentView } />
            ))
        }
    </div>
);

export default withSelection(TimeColumn);