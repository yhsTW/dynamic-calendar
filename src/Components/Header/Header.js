import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../Controls';
import Label from '../Label';
import ViewControls from '../ViewControls';
import { MONTH, WEEK, DAY, COMPONENT_NAMES } from '../../variables';
import moment from 'moment';
import { orderComponents } from '../../utils/utils';
import styles from './styles.css';

const Header = ({ today, currentDate, views, currentView, updateCurrentDate, updateCurrentView, customizeHeader : { Controls : customizeControls, Label : customizeLabel, ViewControls : customizeViewControls, order, style } }) => {
    const getComponents = () => ({
        [COMPONENT_NAMES.controls] : (
            <Controls key={ COMPONENT_NAMES.controls } today={ today } currentDate={ currentDate } updateCurrentDate={ updateCurrentDate }
                customizeControls={ customizeControls } />
        ),
        [COMPONENT_NAMES.label] : (
            <Label key={ COMPONENT_NAMES.label } className={ styles.currentViewDate } text={ `${ currentDate.get('year') }년 ${ currentDate.get('month') + 1 }월` }
                customizeLabel={ customizeLabel } />
        ),
        [COMPONENT_NAMES.viewControls] : (
            <ViewControls key={ COMPONENT_NAMES.viewControls } views={ views } currentView={ currentView } updateCurrentView={ updateCurrentView }
                customizeViewControls={ customizeViewControls } />
        )
    });

    return (
        <div className={ styles.header }>
            { orderComponents(order, getComponents()) }
        </div>
    );
};

Header.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(PropTypes.string.isRequired),
    currentView : PropTypes.oneOf([MONTH, WEEK, DAY]).isRequired,
    updateCurrentDate : PropTypes.func.isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default Header;