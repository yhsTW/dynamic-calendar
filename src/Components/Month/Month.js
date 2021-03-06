import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import MonthHeader from '../MonthHeader';
import moment from 'moment';
import Popup from '../Popup/Popup';
import styles from './styles.css';
import MonthContent from '../MonthContent';
import { VIEW_TYPE } from '../../utils/constants';

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
        const { popup } = this.props;

        if(popup) {
            this.popup = { 
                top,
                left,
                width : width + width * 0.1,
                height : height + height * 0.4,
                events,
                date
            };
    
            this.setState({ usePopup : true });
        } else {
            this.moveDayView(date);
        }
    };

    moveDayView = date => {
        const { updateCurrentDate, updateCurrentView, views } = this.props;

        if(views.indexOf(VIEW_TYPE.day) !== -1) {
            updateCurrentDate(date);
            updateCurrentView(VIEW_TYPE.day);
        }
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
        const { 
            currentDate, today, onSelectSlot, 
            onSelectEvent, currentView, events, 
            selectable, useExtend, components
        } = this.props;
        const PopupComponent = (components && components.popup) ? components.popup : Popup;
        
        return (
            <div className={ styles.month } onMouseLeave={ this.stopSelecting }>
                <MonthHeader />
                <MonthContent today={ today } events={ events } onSelectSlot={ onSelectSlot } currentDate={ currentDate }
                    onSelectEvent={ onSelectEvent } limit={ limit } setLimit={ this.setLimit } currentView={ currentView }
                    openPopup={ this.openPopup } moveDayView={ this.moveDayView } selectable={ selectable }
                    useExtend={ useExtend } components={ components } />
                {
                    usePopup && (
                        <PopupComponent popup={ this.popup } closePopup={ this.closePopup } onSelectEvent={ onSelectEvent }
                            events={ events } />
                    )
                }
            </div>
        )
    }
}

Month.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([
        VIEW_TYPE.month, 
        VIEW_TYPE.week, 
        VIEW_TYPE.day
    ]).isRequired,
    events : PropTypes.arrayOf(PropTypes.arrayOf(
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
    )),
    popup : PropTypes.bool.isRequired,
    selectable : PropTypes.bool.isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    views : PropTypes.arrayOf(
        PropTypes.oneOf([
            VIEW_TYPE.month, 
            VIEW_TYPE.week, 
            VIEW_TYPE.day
        ])
    ).isRequired,
    components : PropTypes.shape({
        header : PropTypes.elementType,
        dateSlot : PropTypes.elementType,
        eventBar : PropTypes.oneOfType([PropTypes.elementType, PropTypes.shape({
            components : PropTypes.instanceOf(Map).isRequired,
            key : PropTypes.string.isRequired
        })]),
        popup : PropTypes.elementType
    }),
    useExtend : PropTypes.bool,
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired,
    updateCurrentDate : PropTypes.func.isRequired,
    updateCurrentView : PropTypes.func.isRequired
};

export default Month;