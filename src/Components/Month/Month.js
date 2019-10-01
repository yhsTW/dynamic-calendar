import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Week from '../Week';
import Row from '../Row';
import { getDateArr } from '../../utils/monthDate';
import { classification } from '../../utils/classification';
import moment from 'moment';
import Popup from '../Popup/Popup';
import styles from './styles.css';

class Month extends Component {
    month = createRef();
    limit = 0;
    lastSelectedDate = null;
    defaultSelectedDate = null;
    popup = {
        top : 0,
        left : 0,
        width : 0,
        height : 0,
        events : [],
        date : null
    };
    
    state = {
        isSelecting : false,
        selectedStart : null,
        selectedEnd : null,
        limit : this.limit,
        usePopup : false
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

    setDates = date => {
        this.setSelectedStart(date);
        this.setSelectedEnd(date);
        this.setLastSelectedDate(date);
        this.setDefaultSelectedDate(date);
    };

    setSelectedStart = selectedStart => this.setState({ selectedStart });

    setSelectedEnd = selectedEnd => this.setState({ selectedEnd });

    setLastSelectedDate = date => this.lastSelectedDate = date;

    setDefaultSelectedDate = date => this.defaultSelectedDate = date;

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
        const { isSelecting, selectedStart, selectedEnd, limit, usePopup } = this.state;
        const { currentDate, today, onSelectSlot, onSelectEvent } = this.props;
        const dateArr = getDateArr(currentDate);
        
        return (
            <div className={ styles.month } ref={ this.month } onMouseLeave={ this.stopSelecting }>
                <Week />
                { 
                    dateArr.map((itemArr, idx) => (
                        <Row ref={ this.row } key={ idx + 1 } today={ today } itemArr={ itemArr } events={ events[idx] } onSelectSlot={ onSelectSlot }
                            isSelecting={ isSelecting } stopSelecting={ this.stopSelecting } startSelecting={ this.startSelecting }
                            setSelectedStart={ this.setSelectedStart } setSelectedEnd={ this.setSelectedEnd } selectedStart={ selectedStart }
                            selectedEnd={ selectedEnd } lastSelectedDate={ this.lastSelectedDate } setLastSelectedDate={ this.setLastSelectedDate }
                            defaultSelectedDate={ this.defaultSelectedDate } onSelectEvent={ onSelectEvent } limit={ limit } setLimit={ this.setLimit }
                            openPopup={ this.openPopup } />
                    ))
                }
                { usePopup && <Popup popup={ this.popup } closePopup={ this.closePopup } onSelectEvent={ onSelectEvent } /> }
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
                end : PropTypes.instanceOf(Date).isRequired
            }
        )
    )
};

export default Month;