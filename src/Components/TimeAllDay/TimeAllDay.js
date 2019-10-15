import React from 'react';
import Row from '../Row';
import withSelection from '../../hoc/withSelection';
import styles from './styles.css';

const TimeAllDay = props => (
    <div className={ styles.timeHeaderAllDays }>
        <Row { ...props.select } { ...props } />
    </div>
);

export default withSelection(TimeAllDay);