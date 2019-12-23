import React, { Fragment } from 'react';
import Label from '../Label';
import styles from './styles.css';

const EventBar = ({ useTime, time, event }) => (
    <Fragment>
        { useTime && <Label className={ `${ styles.timeLabel } ${ styles.ellipsisText }` } text={ time } /> }
        <Label className={ !useTime ? styles.ellipsisText : '' } text={ event.title } />
    </Fragment>
);

export default EventBar;