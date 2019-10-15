import React, { Component, createRef } from 'react';

const withSelection = WrappedComponent => {
    return class Selection extends Component {
        wrappedComponent = createRef();
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
    
            if(!isSelecting) this.setState({ isSelecting : true });
            if(date) this.setDates(date);
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
    
            return <WrappedComponent ref={ this.wrappedComponent } { ...this.props } select={ select } />
        };
    };
};

export default withSelection;