import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import styles from './styles.css';
import moment from 'moment';

const DateSlot = ({ isToday, item, events, isStart, isEnd }) => {
    return (
        <div className={ styles.dateSlot }>
            <Label className={ `${ styles.dateHeader } ${ styles[item.type] } ${ isToday ? styles.today : '' }` } text={ `${ item.date.date() }` } />
        </div>
    );
};

DateSlot.propTypes = {
    isToday : PropTypes.bool.isRequired,
    item : PropTypes.shape({
        type : PropTypes.oneOf(['prev', 'current', 'next']).isRequired,
        date : PropTypes.instanceOf(moment).isRequired
    })
};

export default DateSlot;