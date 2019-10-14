import React from 'react';
import PropTypes from 'prop-types';
import Month from '../Month';
import TimeGrid from '../TimeGrid';
import moment from 'moment';
import { VIEW_TYPE } from '../../variables';

const View = props => {
    if(props.currentView === VIEW_TYPE.month) 
        return (
            <Month { ...props } />
        );
    else 
        return (
            <TimeGrid { ...props } />
        );
};

View.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    events : PropTypes.arrayOf(
        PropTypes.shape(
            {
                id : PropTypes.number.isRequired,
                title : PropTypes.string.isRequired,
                start : PropTypes.instanceOf(Date).isRequired,
                end : PropTypes.instanceOf(Date).isRequired,
                color : PropTypes.string,
                allDay : PropTypes.bool.isRequired
            }
        )
    ),
    onSelectSlot : PropTypes.func,
    onSelectEvent : PropTypes.func
};

export default View;