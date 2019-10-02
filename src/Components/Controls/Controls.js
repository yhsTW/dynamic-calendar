import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import moment from 'moment';
import { CONTROLS_TYPE } from '../../variables';
import orderComponents from '../../utils/orderComponents';
import styles from './styles.css';

const Controls = ({ today, currentDate, updateCurrentDate, customizeControls : { controlStyle, controlsStyle, nextContent, order, prevContent, todayContent } }) => {
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