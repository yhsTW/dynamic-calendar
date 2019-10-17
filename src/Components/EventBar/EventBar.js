import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import styles from './styles.css';

class EventBar extends Component {
    isMouseDown = false;

    componentWillReceiveProps = nextProps => {
        if(!nextProps.isSelecting) this.resetIsMouseDown();
    };

    resetIsMouseDown = () => this.isMouseDown = false;

    onClickEvent = e => {
        console.log('onClickEvent start');
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

    render() {
        const { 
            isStart, isEnd, width, isSelecting,
            event : { title, color }, height, top,
            useTime, time
        } = this.props;
        
        return (
            <div className={ `${ styles.eventBar } ${ isStart ? styles.start : '' } ${ isEnd ? styles.end : '' } ${ top ? styles.timeEventBar : '' }` } 
                style={{ 
                    width, flexBasis : width, 
                    pointerEvents : isSelecting ? 'none' : 'auto', 
                    backgroundColor : color ? color : '',
                    height,
                    top
                }}
                onClick={ this.onClickEvent } onMouseDown={ this.mouseDown } onMouseMove={ this.moveMouse }>
                
                {/* <span>{ title }</span> */}
                { useTime && <Label text={ time } /> }
                <Label text={ title } />
            </div>
        );
    };
};

EventBar.defaultProps = {
    useTime : false
};

EventBar.propTypes = {
    event : PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired
    }).isRequired,
    isEnd : PropTypes.bool.isRequired,
    isSelecting : PropTypes.bool.isRequired,
    width : PropTypes.string.isRequired,
    startSelecting : PropTypes.func.isRequired,
    onSelectEvent : PropTypes.func.isRequired
};

export default EventBar;