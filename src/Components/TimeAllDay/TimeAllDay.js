import React from 'react';
import Row from '../Row';
import withSelection from '../../hoc/withSelection';
import styles from './styles.css';
import { CUSTOMIZE } from '../../utils/constants';

const TimeAllDay = props => (
    <div className={ styles.timeHeaderAllDays }>
        <Row { ...props.select } { ...props } customizeList={[CUSTOMIZE.backgroundCell]} />
    </div>
);

export default withSelection(TimeAllDay);