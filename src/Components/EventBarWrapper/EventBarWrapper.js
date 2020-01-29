import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import EventBar from '../EventBar/EventBar';

class EventBarWrapper extends Component {
    isMouseDown = false;

    componentDidMount = () => {
        const { isSelecting } = this.props;
        
        if(!isSelecting) this.resetIsMouseDown();
    };

    componentDidUpdate = () => {
        const { isSelecting } = this.props;
        
        if(!isSelecting) this.resetIsMouseDown();
    }

    resetIsMouseDown = () => this.isMouseDown = false;

    onClickEvent = e => {
        const { event, onSelectEvent } = this.props;

        this.resetIsMouseDown();
        onSelectEvent(event, e);
    };

    mouseDown = () => this.isMouseDown = true;

    moveMouse = () => {
        if(this.isMouseDown) {
            const { startSelecting } = this.props;

            startSelecting();
        }
    };

    getEventBarComponent = () => {
        const { components } = this.props;
        let component = EventBar;

        if(components && components.eventBar) {
            const { event, components : { eventBar } } = this.props;

            component = eventBar.components ? eventBar.components.get(event[eventBar.key]) : eventBar;
        }

        return component;
    };

    render() {
        const { 
            isStart, isEnd, width, isSelecting,
            event : { color }, height, top,
            useTime, time, left, event, eventProperty
        } = this.props;
        const EventBarComponent = this.getEventBarComponent();
        
        return (
            <div className={ `${ styles.eventBarWrapper } ${ isStart ? styles.start : '' } ${ isEnd ? styles.end : '' } ${ top ? styles.timeEventBarWrapper : '' }` } 
                style={{ 
                    width, flexBasis : width, 
                    pointerEvents : isSelecting ? 'none' : 'auto', 
                    backgroundColor : color ? color : '',
                    height,
                    top,
                    left
                }}
                onClick={ this.onClickEvent } onMouseDown={ this.mouseDown } onMouseMove={ this.moveMouse }
                title={ useTime ? `(${ time }) ${ event[eventProperty.title] }` : `${ event[eventProperty.title] }` }>
                <EventBarComponent useTime={ useTime } time={ time } event={ event } eventProperty={ eventProperty } />
            </div>
        );
    };
};

EventBarWrapper.defaultProps = {
    useTime : false
};

EventBarWrapper.propTypes = {
    event : PropTypes.shape({
        id : PropTypes.number,
        title : PropTypes.string,
        start : PropTypes.instanceOf(Date),
        end : PropTypes.instanceOf(Date),
        color : PropTypes.string,
        allDay : PropTypes.bool
    }).isRequired,
    isEnd : PropTypes.bool.isRequired,
    isSelecting : PropTypes.bool,
    isStart : PropTypes.bool.isRequired,
    useTime : PropTypes.bool.isRequired,
    width : PropTypes.string,
    onSelectEvent : PropTypes.func.isRequired,
    startSelecting : PropTypes.func
};

export default EventBarWrapper;