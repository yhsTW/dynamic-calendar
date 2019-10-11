import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Month from '../Month';
import TimeGrid from '../TimeGrid';
import moment from 'moment';
import { VIEW_TYPE } from '../../variables';

class View extends Component {
    lastSelectedDate = null;
    defaultSelectedDate = null;

    state = {
        isSelecting : false,
        selectedStart : null,
        selectedEnd : null
    };

    setSelectedStart = selectedStart => this.setState({ selectedStart });

    setSelectedEnd = selectedEnd => this.setState({ selectedEnd });

    setLastSelectedDate = date => this.lastSelectedDate = date;

    setDefaultSelectedDate = date => this.defaultSelectedDate = date;

    setDates = date => {
        this.setSelectedStart(date);
        this.setSelectedEnd(date);
        this.setLastSelectedDate(date);
        this.setDefaultSelectedDate(date);
    };

    stopSelecting = () => {
        this.setState({ isSelecting : false });
        this.setDates(null);
    };

    startSelecting = date => {
        const { isSelecting } = this.state;

        if(!isSelecting) {
            this.setState({ isSelecting : true });
        }

        if(date) {
            this.setDates(date);
        }
    };

    render() {
        const { isSelecting, selectedStart, selectedEnd } = this.state;
        const { today, currentDate, currentView } = this.props;
        const select = {
            isSelecting, selectedStart, selectedEnd, 
            setSelectedStart : this.setSelectedStart, setSelectedEnd : this.setSelectedEnd, 
            setLastSelectedDate : this.setLastSelectedDate, setDefaultSelectedDate : this.setDefaultSelectedDate, 
            stopSelecting : this.stopSelecting, startSelecting : this.startSelecting,
            lastSelectedDate : this.lastSelectedDate, defaultSelectedDate : this.defaultSelectedDate
        };
        console.log('currentView : ', currentView)

        if(currentView === VIEW_TYPE.month) return (
            <Month key={ currentDate } { ...this.props } select={ select } />
        );
        
        else if(currentView !== VIEW_TYPE.month) return (
            <TimeGrid today={ today } { ...this.props } select={ select } />
        );
    }
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