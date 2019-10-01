import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../Controls';
import Label from '../Label';
import ViewControls from '../ViewControls';
import { MONTH, WEEK, DAY } from '../../variables';
import moment from 'moment';
import styles from './styles.css';

const Header = ({ today, currentDate, views, currentView, updateCurrentDate, updateCurrentView }) => (
    <div className={ styles.header }>
        <Controls today={ today } currentDate={ currentDate } updateCurrentDate={ updateCurrentDate } />
        <Label className={ styles.currentViewDate } text={ `${ currentDate.get('year') }년 ${ currentDate.get('month') + 1 }월` } />
        <ViewControls views={ views } currentView={ currentView } updateCurrentView={ updateCurrentView } />
    </div>
);

Header.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(PropTypes.string.isRequired),
    currentView : PropTypes.oneOf([MONTH, WEEK, DAY]).isRequired,
    updateCurrentDate : PropTypes.func.isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default Header;