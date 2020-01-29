import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withSelection = WrappedComponent => {
    return class Selection extends Component {
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
    
        render() {
            const { isSelecting, selectedStart, selectedEnd } = this.state;
            const select = {
                isSelecting, selectedStart, selectedEnd, 
                setSelectedStart : this.setSelectedStart, setSelectedEnd : this.setSelectedEnd,
                setLastSelectedDate : this.setLastSelectedDate, setDefaultSelectedDate : this.setDefaultSelectedDate,
                stopSelecting : this.stopSelecting, startSelecting : this.startSelecting,
                lastSelectedDate : this.lastSelectedDate, defaultSelectedDate : this.defaultSelectedDate
            };
    
            return <WrappedComponent { ...this.props } select={ select } />
        };
    };
};

withSelection.propTypes = {
    selectable : PropTypes.bool.isRequired
};

export default withSelection;