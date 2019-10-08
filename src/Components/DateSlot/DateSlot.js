import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import styles from './styles.css';
import moment from 'moment';
import { MONTH_TYPE } from '../../variables';

const DATE_HEADER_STYLE = 'dateHeaderStyle';

const DateSlot = ({ isToday, item : { date, type }, customizeDateSlot : { customizeToday, holiday, weekend, weekdays, prevMonth, nextMonth } }) => {
    const getDateSlotStyle = () => {
        // TODO: holiday는 나중에
        let style = {};

        if(isToday) style = { ...style, ...customizeToday[DATE_HEADER_STYLE] };
        if(date.day() !== 0 && date.day() !== 6) style = { ...style, ...weekdays[DATE_HEADER_STYLE] };
        if(date.day() === 0) style = { ...style, ...weekend[DATE_HEADER_STYLE].sundayStyle };
        if(date.day() === 6) style = { ...style, ...weekend[DATE_HEADER_STYLE].saturdayStyle };
        if(type === MONTH_TYPE.prev) style = { ...style, ...prevMonth[DATE_HEADER_STYLE] };
        if(type === MONTH_TYPE.next) style = { ...style, ...nextMonth[DATE_HEADER_STYLE] };

        return style;
    };
    
    const dateSlotStyle = getDateSlotStyle();
    return (
        <Label className={ `${ styles.dateHeader } ${ styles[type] } }` } text={ `${ date.date() }` }
            style={ dateSlotStyle } />
    );
};

DateSlot.propTypes = {
    isToday : PropTypes.bool.isRequired,
    item : PropTypes.shape({
        type : PropTypes.oneOf(['prev', 'current', 'next']).isRequired,
        date : PropTypes.instanceOf(moment).isRequired
    }),
    customizeDateSlot : PropTypes.shape({
        customizeToday : PropTypes.shape({
            dateHeaderStyle : PropTypes.object
        }),
        holiday : PropTypes.shape({
            dateHeaderStyle : PropTypes.object
        }),
        weekdays : PropTypes.shape({
            dateHeaderStyle : PropTypes.object
        }),
        weekend : PropTypes.shape({
            dateHeaderStyle : PropTypes.shape({
                saturdayStyle : PropTypes.object,
                sundayStyle : PropTypes.object
            })
        })
    })
};

export default DateSlot;