import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { VIEW_TYPE, CUSTOMIZE} from '../../utils/constants';
import styles from './styles.css';
import withCustomize from '../../hoc/withCustomize';

const ViewControls = ({ views, currentView, updateCurrentView, getCustomize }) => {
    const { 
        [CUSTOMIZE.viewControls] : { viewControlsStyle, viewControlStyle } 
    } = getCustomize([CUSTOMIZE.viewControls]);

    const showViewType = view => {
        switch(view) {
            case VIEW_TYPE.month : 
                return '월간';
            
            case VIEW_TYPE.week :
                return '주간';
    
            case VIEW_TYPE.day :
                return '일간';
        }
    };

    return (
        <div className={ styles.viewControls } style={ viewControlsStyle }>
            { 
                views.map(view => (
                    <Button key={ view } className={ `${ styles.view } ${ view === currentView ? styles.active : '' }` } style={ viewControlStyle } 
                        onClick={ view === currentView ? () => {} : () => updateCurrentView(view) } text={ showViewType(view) } />
                )) 
            }
        </div>
    );
};

ViewControls.propTypes = {
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    views : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    getCustomize : PropTypes.func.isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.header)(ViewControls);