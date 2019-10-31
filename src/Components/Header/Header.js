import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../Controls';
import Label from '../Label';
import ViewControls from '../ViewControls';
import withCustomize from '../../hoc/withCustomize';
import { VIEW_TYPE, COMPONENT_NAMES, CUSTOMIZE, WEEK_DATA } from '../../utils/constants';
import moment from 'moment';
import sortComponents from '../../utils/sortComponents';
import styles from './styles.css';
import { getSunday, getSaturday } from '../../utils/dateUtil';

const Header = ({ today, currentDate, views, currentView, updateCurrentDate, updateCurrentView, getCustomize }) => {
    // customize의 값들 중 필요한 값들만 불러온다.
    const { 
        order, style, Label : customize
    } = getCustomize([CUSTOMIZE.order, CUSTOMIZE.style, CUSTOMIZE.label]);

    // 일요일과 현재 날짜의 월(month)이 동일한지 확인한다.
    const isSameSunday = () => getSunday(currentDate).isSame(currentDate, 'month');
    
    // 토요일과 현재 날짜의 월(month)이 동일한지 확인한다.
    const isSameSaturday = () => getSaturday(currentDate).isSame(currentDate, 'month');

    // 현재 사용자가 보고있는 달력 타입에 따라 label을 형식에 맞게 변경한다.
    const viewLabel = () => {
        let currentViewDate = `${ currentDate.year() }년 ${ currentDate.month() + 1 }월`;

        // 현재 보고있는 달력 타입이 주간(week)일 경우
        if(currentView === VIEW_TYPE.week) {
            // 일, 토요일의 달이 기준이 되는 날(currentDate)와 다를 경우
            if(!isSameSunday() || !isSameSaturday()) {
                // currentDate와 비교할 월을 가져온다.
                // 일요일이 다르면 일요일의 월을, 토요일이 다르다면 토요일의 월을 가져온다.
                const compareMonth = isSameSunday() ? getSaturday(currentDate).month() : getSunday(currentDate).month();
                // currentDate의 월을 가져온다.
                const currentMonth = currentDate.month();
                // 먼저 작성할 월을 가져온다.
                const prevMonth = compareMonth > currentMonth ? currentMonth : compareMonth;
                // 다음 작성할 월을 가져온다.
                const nextMonth = compareMonth > currentMonth ? compareMonth : currentMonth;
                
                currentViewDate = `
                    ${ currentDate.year() }년
                    ${ prevMonth + 1 }월
                    -
                    ${ nextMonth + 1 }월
                `;
            }
        } else if(currentView === VIEW_TYPE.day) {
            // 사용자가 보고있는 달력 타입이 일간(day)일 경우
            currentViewDate = `
                ${ currentViewDate }
                ${ currentDate.date() }일
                ${ WEEK_DATA[currentDate.day()] }요일
            `;
        }

        return currentViewDate;
    };

    // Header 컴포넌트에서 사용하는 컴포넌트들을 가져온다.
    const getComponents = () => ({
        [COMPONENT_NAMES.controls] : (
            <Controls key={ COMPONENT_NAMES.controls } today={ today } currentDate={ currentDate } 
                updateCurrentDate={ updateCurrentDate } currentView={ currentView } />
        ),
        [COMPONENT_NAMES.label] : (
            <Label key={ COMPONENT_NAMES.label } className={ styles.currentViewDate } customize={ customize.style }
                fortmat={ customize.fortmat } text={ viewLabel() } />
        ),
        [COMPONENT_NAMES.viewControls] : (
            <ViewControls key={ COMPONENT_NAMES.viewControls } views={ views } currentView={ currentView } 
                updateCurrentView={ updateCurrentView } />
        )
    });

    return (
        <div className={ styles.header } style={ style }>
            { sortComponents(order, getComponents()) }
        </div>
    );
};

Header.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(PropTypes.string.isRequired),
    getCustomize : PropTypes.func.isRequired,
    updateCurrentDate : PropTypes.func.isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.header)(Header);