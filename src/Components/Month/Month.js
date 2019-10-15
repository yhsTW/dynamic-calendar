import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import MonthHeader from '../MonthHeader';
import { classification } from '../../utils/classification';
import moment from 'moment';
import Popup from '../Popup/Popup';
import styles from './styles.css';
import MonthContent from '../MonthContent';

class Month extends Component {
    month = createRef();
    limit = 0;
    popup = {
        top : 0,
        left : 0,
        width : 0,
        height : 0,
        events : [],
        date : null
    };
    
    state = {
        limit : this.limit,
        usePopup : false
    };

    settingEvents = () => {
        const { events : pEvents, currentDate : pCurrentDate } = this.props;
        const classificationEvents = classification(pEvents, pCurrentDate);
        
        return classificationEvents;
    };

    setLimit = limit => {
        if(this.limit !== limit) {
            this.limit = limit;

            this.setState({ limit });
        }
    };

    openPopup = ({ top, left, width, height, events, date }) => {
        this.popup = { 
            top,
            left,
            width : width + width * 0.1,
            height : height + height * 0.4,
            events,
            date
        };

        this.setState({ usePopup : true });
    };

    closePopup = () => {
        const { usePopup } = this.state;

        if(usePopup) {
            this.popup = { top : 0, left : 0, width : 0, height : 0, events : [], date : null };
            this.setState({ usePopup : false });
        }
    };

    render() {
        const events = this.settingEvents();
        const { limit, usePopup } = this.state;
        const { 
            currentDate, today, onSelectSlot, onSelectEvent, 
            customizeView : { 
                BackgroundCell, More, Popup : customizePopup, holiday, today : customizeToday,
                weekdays, weekend, prevMonth, nextMonth
            }, currentView
        } = this.props;
        
        return (
            <div className={ styles.month } onMouseLeave={ this.stopSelecting }>
                <MonthHeader customizeWeek={{ weekend }} />
                <MonthContent today={ today } events={ events } onSelectSlot={ onSelectSlot } currentDate={ currentDate }
                    onSelectEvent={ onSelectEvent } limit={ limit } setLimit={ this.setLimit } currentView={ currentView }
                    openPopup={ this.openPopup } customizeRow={{ BackgroundCell, More, holiday, today : customizeToday, weekdays, weekend, prevMonth, nextMonth }} />
                {
                    usePopup && (
                        <Popup popup={ this.popup } closePopup={ this.closePopup } onSelectEvent={ onSelectEvent }
                            customizePopup={ customizePopup } />
                    )
                }
            </div>
        )
    }
}

Month.propTypes = {
    today : PropTypes.instanceOf(moment).isRequired,
    currentDate : PropTypes.instanceOf(moment).isRequired,
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
    )
};

export default Month;