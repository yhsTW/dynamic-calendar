import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import styles from './styles.css';
import moment from 'moment';
import combineStyle from '../../utils/combineStyle';
import { PROPERTY } from '../../utils/constants';

const DateSlot = ({ isToday, item, customize, moveDayView, isSelecting, startSelecting }) => {
    let isMouseDown = false;

    const getDateSlotStyle = () => {
        const style = combineStyle({
            styleObj : customize, 
            item, isToday, 
            property : PROPERTY.dateHeaderStyle
        });

        return { 
            ...style, 
            pointerEvents : isSelecting ? 'none' : 'auto',
            cursor : 'pointer',
            padding : '5px'
        };
    };

    const mouseDown = () => isMouseDown = true;

    const moveMouse = () => {
        if(isMouseDown) {
            startSelecting(item.date);
        }
    };

    const dateSlotClick = () => {
        moveDayView(item.date);
        isMouseDown = false;
    };
    
    return (
        <Label className={ styles.dateHeader } text={ `${ item.date.date() }` }
            customize={ getDateSlotStyle() } onClick={ dateSlotClick }
            onMouseMove={ moveMouse } onMouseDown={ mouseDown } />
    );
};

DateSlot.propTypes = {
    customize : PropTypes.shape({
        holiday : PropTypes.shape({
            backgroundCellStyle : PropTypes.object,
            dateHeaderStyle : PropTypes.object.isRequired
        }),
        nextMonth : PropTypes.shape({
            backgroundCellStyle : PropTypes.object,
            dateHeaderStyle : PropTypes.object.isRequired
        }),
        prevMonth : PropTypes.shape({
            backgroundCellStyle : PropTypes.object,
            dateHeaderStyle : PropTypes.object.isRequired
        }),
        today : PropTypes.shape({
            backgroundCellStyle : PropTypes.object,
            dateHeaderStyle : PropTypes.object.isRequired
        }),
        weekdays : PropTypes.shape({
            backgroundCellStyle : PropTypes.object,
            dateHeaderStyle : PropTypes.object.isRequired
        }),
        weekend : PropTypes.shape({
            backgroundCellStyle : PropTypes.object,
            dateHeaderStyle : PropTypes.object.isRequired
        })
    }).isRequired,
    isSelecting : PropTypes.bool.isRequired,
    isToday : PropTypes.bool.isRequired,
    item : PropTypes.shape({
        type : PropTypes.oneOf(['prev', 'current', 'next']).isRequired,
        date : PropTypes.instanceOf(moment).isRequired
    }),
    moveDayView : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired
};

export default DateSlot;