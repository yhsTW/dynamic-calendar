import React from 'react';
import PropTypes from 'prop-types';
import Month from '../Month';
import TimeGrid from '../TimeGrid';
import moment from 'moment';
import { VIEW_TYPE } from '../../utils/constants';

const View = props => {
    if(props.currentView === VIEW_TYPE.month) return (<Month { ...props } />);
    else return (<TimeGrid { ...props } />);
};

View.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([
        VIEW_TYPE.month, 
        VIEW_TYPE.week, 
        VIEW_TYPE.day
    ]).isRequired,
    events : PropTypes.arrayOf(
        PropTypes.shape(
            {
                id : PropTypes.number.isRequired,
                title : PropTypes.string.isRequired,
                start : PropTypes.instanceOf(Date).isRequired,
                end : PropTypes.instanceOf(Date).isRequired,
                color : PropTypes.string,
                allDay : PropTypes.bool
            }
        )
    ),
    popup : PropTypes.bool.isRequired,
    selectable : PropTypes.bool.isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(
        PropTypes.oneOf([
            VIEW_TYPE.month, 
            VIEW_TYPE.week, 
            VIEW_TYPE.day
        ]).isRequired
    ).isRequired,
    onSelectSlot : PropTypes.func.isRequired,
    onSelectEvent : PropTypes.func.isRequired,
    updateCurrentDate : PropTypes.func.isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default View;