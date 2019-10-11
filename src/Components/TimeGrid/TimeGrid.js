import React from 'react';
import TimeHeader from '../TimeHeader';
import TimeContent from '../TimeContent';
import { VIEW_TYPE } from '../../variables';
import styles from './styles.css';

const TimeGrid = ({ today, currentDate, events, onSelectSlot, onSelectEvent, customizeView, select, currentView }) => (
    <div className={ styles.week }>
        <TimeHeader today={ today } currentDate={ currentDate } currentView={ currentView } 
            customizeTimeHeader={customizeView} select={ select } onSelectSlot={ onSelectSlot }
            events={ events } onSelectSlot={ onSelectSlot } onSelectEvent={ onSelectEvent } />
        <TimeContent />
    </div>
);

export default TimeGrid;