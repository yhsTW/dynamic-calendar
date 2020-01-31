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
    
        setDates = date => {
            this.setSelectedStart(date);
            this.setSelectedEnd(date);
            this.setLastSelectedDate(date);
            this.setDefaultSelectedDate(date);
        };
    
        stopSelecting = () => {
            const { isSelecting } = this.state;

            if(isSelecting) {
                this.setState({ isSelecting : false });
                this.setDates(null);
            }
        };
    
        startSelecting = date => {
            const { selectable } = this.props;
            
            if(selectable) {
                const { isSelecting } = this.state;
        
                if(!isSelecting) this.setState({ isSelecting : true });
                if(date) this.setDates(date);
            }
        };

        resetTime = date => {
            date.set({ hour : 0, minute : 0, second : 0 });
        };

        makeSlots = (start, end) => {
            let slots = [];
            const { _data : { days } } = moment.duration(end.diff(start));
    
            for(let i = 0; i <= days; i++) {
                const pushDate = moment(start).add(i, 'days');
                slots.push(pushDate);
            }
    
            return slots;
        };

        slotSelectEnd = () => {
            const { selectedStart : start, selectedEnd : end } = this.state;
            const { onSelectSlot, useTime } = this.props;
    
            this.stopSelecting();
    
            if(start) {
                if(!useTime) {
                    this.resetTime(start);
                    this.resetTime(end);
                }
                const slots = this.makeSlots(start, end);
        
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