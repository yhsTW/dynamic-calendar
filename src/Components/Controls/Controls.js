import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import moment from 'moment'
import styles from './styles.css';

const Controls = ({ today, currentDate, updateCurrentDate }) => {
    const getDateMonth = () => {
        const date = moment(currentDate);
        const month = date.get('month');

        return { date, month };
    };

    const movePrevDate = () => {
        const { date, month } = getDateMonth();
        date.set('month', month - 1);
        
        updateCurrentDate(date);
    };
    
    const goToday = () => {
        const { date } = getDateMonth();

        if(date.isSame(today, 'month')) return;

        updateCurrentDate(today);
    }
    
    const moveNextDate = () => {
        const { date, month } = getDateMonth();
        date.set('month', month + 1);

        updateCurrentDate(date);
    };
    
    return (
        <div className={ styles.controls }>
            <Button className={ `${ styles.buttons } ${ styles.todayBtn }` } text="오늘" onClick={ goToday } />
            <Button className={ `${ styles.buttons } ${ styles.moveBtn }` } text="<" onClick={ movePrevDate } />
            <Button className={ `${ styles.buttons } ${ styles.moveBtn }` } text=">" onClick={ moveNextDate } />
        </div>
    );
};

Controls.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    updateCurrentDate : PropTypes.func.isRequired
};

export default Controls;