import React from 'react';
import TimeHeader from '../TimeHeader';
import { VIEW_TYPE } from '../../variables';
import styles from './styles.css';

const Day = ({ today, currentDate, events, onSelectSlot, onSelectEvent }) => (
    <div className={ styles.day }>
        <TimeHeader today={ today } currentDate={ currentDate } currentView={ VIEW_TYPE.day } />
    </div>
);

export default Day;