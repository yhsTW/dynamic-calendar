import React from 'react';
import PropTypes from 'prop-types';
import Month from '../Month';
import moment from 'moment';
import { MONTH, WEEK, DAY } from '../../variables';

const View = ({ today, currentDate, currentView, events, onSelectSlot, onSelectEvent }) => {
    if(currentView === MONTH) return (
        <Month key={ currentDate } today={ today } currentDate={ currentDate } events={ events } onSelectSlot={ onSelectSlot }
            onSelectEvent={ onSelectEvent } />
    );
    else if(currentView === WEEK) return <div>Week</div>;
    else if(currentView === DAY) return <div>Day</div>;
};

View.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([MONTH, WEEK, DAY]).isRequired,
    events : PropTypes.arrayOf(
        PropTypes.shape(
            {
                id : PropTypes.number.isRequired,
                title : PropTypes.string.isRequired,
                start : PropTypes.instanceOf(Date).isRequired,
                end : PropTypes.instanceOf(Date).isRequired
            }
        )
    ),
    onSelectSlot : PropTypes.func,
    onSelectEvent : PropTypes.func
};

export default View;