import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import withCustomize from '../../hoc/withCustomize';
import moment from 'moment';
import { CONTROLS_TYPE, VIEW_TYPE, WEEK_NUM, CUSTOMIZE } from '../../utils/constants';
import sortComponents from '../../utils/sortComponents';
import styles from './styles.css';

const Controls = ({ today, currentDate, updateCurrentDate, currentView, getCustomize }) => {
    const { 
        [CUSTOMIZE.controls] : {
            order, prevContent, todayContent, nextContent, controlsStyle, controlStyle 
        }
    } = getCustomize([CUSTOMIZE.controls]);

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

        if(
            (currentView === VIEW_TYPE.month && date.isSame(today, 'month')) ||
            (currentView !== VIEW_TYPE.month && date.isSame(today, 'date'))
        ) return;

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

    const getComponents = () => {
        return ({
            [CONTROLS_TYPE.today] : (
                <Button key={ CONTROLS_TYPE.today } className={ `${ styles.buttons } ${ styles.todayBtn }` } 
                    // style={ Controls.controlStyle } text={ Controls.todayContent } onClick={ goToday } />
                    style={ controlStyle } text={ todayContent } onClick={ goToday } />
            ),
            [CONTROLS_TYPE.prev] : (
                <Button key={ CONTROLS_TYPE.prev } className={ `${ styles.buttons } ${ styles.moveBtn }` } 
                    style={ controlStyle } text={ prevContent } onClick={ movePrevDate } />
            ),
            [CONTROLS_TYPE.next] : (
                <Button key={ CONTROLS_TYPE.next } className={ `${ styles.buttons } ${ styles.moveBtn }` } 
                    style={ controlStyle } text={ nextContent } onClick={ moveNextDate } />
            )
        });
    };

    return (
        <div className={ styles.controls } style={ controlsStyle }>
            { sortComponents(order, getComponents()) }
        </div>
    );
};

Controls.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    updateCurrentDate : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.header)(Controls);