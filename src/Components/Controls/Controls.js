import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import moment from 'moment';
import { CONTROLS_TYPE, VIEW_TYPE, WEEK_NUM } from '../../variables';
import { orderComponents } from '../../utils/utils';
import styles from './styles.css';

const Controls = ({ today, currentDate, updateCurrentDate, currentView, customizeControls : { controlStyle, controlsStyle, nextContent, order, prevContent, todayContent } }) => {
    const getDate = () => {
        const date = moment(currentDate);

        return date;
    };

    const movePrevDate = () => {
        const date = getDate();

        if(currentView === VIEW_TYPE.month) {
            date.set('month', date.month() - 1);
        } else if(currentView === VIEW_TYPE.week) {
            date.set('date', date.date() - WEEK_NUM);
        } else if(currentView === VIEW_TYPE.day) {
            date.set('date', date.date() - 1);
        }
        
        updateCurrentDate(date);
    };
    
    const goToday = () => {
        const date = getDate();

        if(date.isSame(today, 'month')) return;

        updateCurrentDate(today);
    }
    
    const moveNextDate = () => {
        const date = getDate();
        
        if(currentView === VIEW_TYPE.month) {
            date.set('month', date.month() + 1);
        } else if(currentView === VIEW_TYPE.week) {
            date.set('date', date.date() + WEEK_NUM);
        } else if(currentView === VIEW_TYPE.day) {
            date.set('date', date.date() + 1);
        }

        updateCurrentDate(date);
    };

    const getComponents = () => ({
        [CONTROLS_TYPE.today] : <Button key={ CONTROLS_TYPE.today } className={ `${ styles.buttons } ${ styles.todayBtn }` } style={ controlStyle } text={ todayContent } onClick={ goToday } />,
        [CONTROLS_TYPE.prev] : <Button key={ CONTROLS_TYPE.prev } className={ `${ styles.buttons } ${ styles.moveBtn }` } style={ controlStyle } text={ prevContent } onClick={ movePrevDate } />,
        [CONTROLS_TYPE.next] : <Button key={ CONTROLS_TYPE.next } className={ `${ styles.buttons } ${ styles.moveBtn }` } style={ controlStyle } text={ nextContent } onClick={ moveNextDate } />
    });

    return (
        <div className={ styles.controls } style={ controlsStyle }>
            { orderComponents(order, getComponents()) }
        </div>
    );
};

Controls.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    updateCurrentDate : PropTypes.func.isRequired
};

export default Controls;