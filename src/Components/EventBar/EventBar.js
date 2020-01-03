import React, { Fragment } from 'react';
import Label from '../Label';
import styles from './styles.css';

const EventBar = ({ useTime, time, event, eventProperty : { title } }) => (
    <Fragment>
        { useTime && <Label className={ styles.eventLabel } text={ time } /> }
        <Label className={ styles.eventLabel } text={ event[title] } />
    </Fragment>
);

export default EventBar;