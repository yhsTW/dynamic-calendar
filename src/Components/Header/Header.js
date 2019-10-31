import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../Controls';
import Label from '../Label';
import ViewControls from '../ViewControls';
import withCustomize from '../../hoc/withCustomize';
import { VIEW_TYPE, COMPONENT_NAMES, CUSTOMIZE } from '../../utils/constants';
import moment from 'moment';
import sortComponents from '../../utils/sortComponents';
import styles from './styles.css';

const Header = ({ today, currentDate, views, currentView, updateCurrentDate, updateCurrentView, getCustomize }) => {
    const { 
        order, style, Label : customize
    } = getCustomize([CUSTOMIZE.order, CUSTOMIZE.style, CUSTOMIZE.label]);

    const getComponents = () => ({
        [COMPONENT_NAMES.controls] : (
            <Controls key={ COMPONENT_NAMES.controls } today={ today } currentDate={ currentDate } 
                updateCurrentDate={ updateCurrentDate } currentView={ currentView } />
        ),
        [COMPONENT_NAMES.label] : (
            <Label key={ COMPONENT_NAMES.label } className={ styles.currentViewDate } customize={ customize.style }
                fortmat={ customize.fortmat } text={ `${ currentDate.get('year') }년 ${ currentDate.get('month') + 1 }월` } />
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
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(PropTypes.string.isRequired),
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    updateCurrentDate : PropTypes.func.isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.header)(Header);