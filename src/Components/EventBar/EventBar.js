import React, { Fragment } from 'react';
import Label from '../Label';
import styles from './styles.css';

const EventBar = ({ useTime, time, event }) => (
    <Fragment>
        { useTime && <Label className={ styles.timeLabel } text={ time } /> }
        <Label text={ event.title } />
    </Fragment>
);

export default EventBar;