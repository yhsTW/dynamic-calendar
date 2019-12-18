import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import moment from 'moment';
import { CONTROLS_TYPE, VIEW_TYPE, WEEK_NUM } from '../../utils/constants';
import sortComponents from '../../utils/sortComponents';
import styles from './styles.css';

const Controls = ({ today, currentDate, updateCurrentDate, currentView, customize }) => {
    const { order, prevContent, todayContent, nextContent, controlsStyle, controlStyle } = customize;

    // currentDate의 값이 변경되지 않도록 새로운 new Date를 만든다.
    const getDate = () => {
        const date = moment(currentDate);

        return date;
    };

    // 현재 보고있는 달력 타입에 따라 이전의 월 또는 일로 이동한다.
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
    
    // 현재 날짜로 바로 이동한다.
    const goToday = () => {
        const date = getDate();

        if((currentView === VIEW_TYPE.month && date.isSame(today, 'month')) ||
            (currentView !== VIEW_TYPE.month && date.isSame(today, 'date'))) 
            return;

        updateCurrentDate(today);
    };
    
    // 현재 보고있는 달력 타입에 따라 이후의 월 또는 일로 이동한다.
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

    // Controls 컴포넌트에서 사용하는 컴포넌트들을 가져온다.
    const getComponents = () => {
        return ({
            [CONTROLS_TYPE.today] : (
                <Button key={ CONTROLS_TYPE.today } className={ `${ styles.buttons } ${ styles.todayBtn }` } 
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
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    customize : PropTypes.shape({
        order : PropTypes.arrayOf(
            PropTypes.oneOf([CONTROLS_TYPE.today,
                CONTROLS_TYPE.prev,
                CONTROLS_TYPE.next
            ])
        ),
        prevContent : PropTypes.string,
        todayContent : PropTypes.string,
        nextContent : PropTypes.string,
        controlsStyle : PropTypes.object,
        controlStyle : PropTypes.object
    }),
    updateCurrentDate : PropTypes.func.isRequired
};

export default Controls;