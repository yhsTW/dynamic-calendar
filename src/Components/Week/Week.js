import React from 'react';
import TimeHeader from '../TimeHeader';
import TimeContent from '../TimeContent';
import { VIEW_TYPE } from '../../variables';
import styles from './styles.css';

const Week = ({ today, currentDate, events, onSelectSlot, onSelectEvent }) => (
    <div className={ styles.week }>
        <TimeHeader today={ today } currentDate={ currentDate } currentView={ VIEW_TYPE.week } />
        <TimeContent />
    </div>
);

export default Week;