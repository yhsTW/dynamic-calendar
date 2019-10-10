import React from 'react';
import PropTypes from 'prop-types';
import Month from '../Month';
import Week from '../Week';
import moment from 'moment';
import { VIEW_TYPE } from '../../variables';

const View = ({ today, currentDate, currentView, events, onSelectSlot, onSelectEvent, customizeView }) => {
    if(currentView === VIEW_TYPE.month) return (
        <Month key={ currentDate } today={ today } currentDate={ currentDate } events={ events } onSelectSlot={ onSelectSlot }
            onSelectEvent={ onSelectEvent } customizeView={ customizeView } />
    );
    else if(currentView === VIEW_TYPE.week) return <Week />;
    else if(currentView === VIEW_TYPE.day) return <div>Day</div>;
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
                end : PropTypes.instanceOf(Date).isRequired
            }
        )
    ),
    onSelectSlot : PropTypes.func,
    onSelectEvent : PropTypes.func
};

export default View;