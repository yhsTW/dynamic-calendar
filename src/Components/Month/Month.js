import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import MonthHeader from '../MonthHeader';
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
        const { limit, usePopup } = this.state;
        const { currentDate, today, onSelectSlot, onSelectEvent, currentView, events } = this.props;
        
        return (
            <div className={ styles.month } onMouseLeave={ this.stopSelecting }>
                <MonthHeader />
                <MonthContent today={ today } events={ events } onSelectSlot={ onSelectSlot } currentDate={ currentDate }
                    onSelectEvent={ onSelectEvent } limit={ limit } setLimit={ this.setLimit } currentView={ currentView }
                    openPopup={ this.openPopup } />
                {
                    usePopup && (
                        <Popup popup={ this.popup } closePopup={ this.closePopup } onSelectEvent={ onSelectEvent }
                            events={ events } />
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