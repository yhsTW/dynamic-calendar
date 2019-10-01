import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { MONTH, WEEK, DAY } from '../../variables';
import styles from './styles.css';

const ViewControls = ({ views, currentView, updateCurrentView }) =>
    <div className={ styles.viewControls }>
        { views.map(view => <Button key={ view } text={ view } className={ `${ styles.view } ${ view === currentView ? styles.active : '' }` } onClick={ view === currentView ? () => {} : () => updateCurrentView(view) } />) }
    </div>

ViewControls.propTypes = {
    views : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    currentView : PropTypes.oneOf([MONTH, WEEK, DAY]).isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default ViewControls;