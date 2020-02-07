import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const withSelection = WrappedComponent => {
    return class Selection extends Component {
        lastSelectedDate = null;
        defaultSelectedDate = null;
    
        state = {
            isSelecting : false,
            selectedStart : null,
            selectedEnd : null
        };

        componentDidMount = () => {
            window.addEventListener('mouseup', this.slotSelectEnd);
        };

        componentWillUnmount = () => {
            window.removeEventListener('mouseup', this.slotSelectEnd);
        };

        setSelectedStart = selectedStart => this.setState({ selectedStart });
        setSelectedEnd = selectedEnd => this.setState({ selectedEnd });
        setLastSelectedDate = date => this.lastSelectedDate = date;
        setDefaultSelectedDate = date => this.defaultSelectedDate = date;
    
        setDates = (date, useTime) => {
            const { selectedStart, selectedEnd } = this.state;
            let end = date;

            if(useTime && !selectedStart && !selectedEnd) {
                const min = moment(date).hour() === 23 && moment(date).minute() === 30 ? 59 : moment(date).minute() + 30;

                end = moment(date).minute(min);
            }

            this.setSelectedStart(date);
            this.setSelectedEnd(end);
            this.setLastSelectedDate(end);
            this.setDefaultSelectedDate(date);
        };
    
        stopSelecting = () => {
            const { isSelecting } = this.state;

            if(isSelecting) {
                this.setState({ isSelecting : false });
                this.setDates(null);
            }
        };
    
        startSelecting = (date, useTime = false) => {
            const { selectable } = this.props;
            
            if(selectable) {
                const { isSelecting } = this.state;
        
                if(!isSelecting) this.setState({ isSelecting : true });
                if(date) this.setDates(date, useTime);
            }
        };

        makeSlots = (start, end, useTime) => {
            let slots = [];
            let endValue = 0;

            if(useTime) {
                const { _milliseconds } = moment.duration(end.diff(start));

                endValue = Math.ceil(_milliseconds / 60000 / 30);
            } else {
                const { _data : { days } } = moment.duration(end.diff(start));
                endValue = days;
            }

            for(let i = 0; i <= endValue; i++) {
                let pushDate = null;
                
                if(useTime) {
                    const addMin = (i === endValue && moment(end).hour() === 23 && moment(end).minute() === 59) ? (i * 30) - 1 : i * 30;
                    pushDate = moment(start).add(addMin, 'minute');
                } else {
                    pushDate = moment(start).add(i, 'days');
                }

                slots.push(pushDate);
            }
    
            return slots;
        };

        slotSelectEnd = useTime => {
            const { selectedStart : start, selectedEnd : end } = this.state;
            const { onSelectSlot } = this.props;
            
            this.stopSelecting();
    
            if(start) {
                const slots = this.makeSlots(start, end, useTime);
        
                onSelectSlot({ slots, start, end });
            }
        };
    
        render() {
            const { isSelecting, selectedStart, selectedEnd } = this.state;
            const select = {
                isSelecting, selectedStart, selectedEnd, 
                setSelectedStart : this.setSelectedStart, setSelectedEnd : this.setSelectedEnd,
                setLastSelectedDate : this.setLastSelectedDate, setDefaultSelectedDate : this.setDefaultSelectedDate,
                stopSelecting : this.stopSelecting, startSelecting : this.startSelecting,
                lastSelectedDate : this.lastSelectedDate, defaultSelectedDate : this.defaultSelectedDate,
                slotSelectEnd : this.slotSelectEnd
            };
    
            return <WrappedComponent { ...this.props } select={ select } />
        };
    };
};

withSelection.propTypes = {
    selectable : PropTypes.bool.isRequired
};

export default withSelection;