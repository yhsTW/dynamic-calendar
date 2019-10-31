import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import styles from './styles.css';
import moment from 'moment';
import combineStyle from '../../utils/combineStyle';
import { PROPERTY } from '../../utils/constants';

const DateSlot = ({ isToday, item, customize }) => {
    const getDateSlotStyle = () => combineStyle({ 
        styleObj : customize, 
        item, isToday, 
        property : PROPERTY.dateHeaderStyle
    });
    
    return (
        <Label className={ styles.dateHeader } text={ `${ item.date.date() }` }
            customize={ getDateSlotStyle() } />
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