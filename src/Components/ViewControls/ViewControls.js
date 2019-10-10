import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { VIEW_TYPE} from '../../variables';
import styles from './styles.css';

const ViewControls = ({ views, currentView, updateCurrentView, customizeViewControls : { viewControlStyle, viewControlsStyle } }) => (
    <div className={ styles.viewControls } style={ viewControlsStyle }>
        { 
            views.map(view => (
                <Button key={ view } className={ `${ styles.view } ${ view === currentView ? styles.active : '' }` } style={ viewControlStyle } 
                    onClick={ view === currentView ? () => {} : () => updateCurrentView(view) } text={ view } />
            )) 
        }
    </div>
);

ViewControls.propTypes = {
    views : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default ViewControls;