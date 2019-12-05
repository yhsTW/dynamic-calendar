import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import styles from './styles.css';

class EventBar extends Component {
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

    render() {
        const { 
            isStart, isEnd, width, isSelecting,
            event : { title, color }, height, top,
            useTime, time, left
        } = this.props;
        
        return (
            <div className={ `${ styles.eventBar } ${ isStart ? styles.start : '' } ${ isEnd ? styles.end : '' } ${ top ? styles.timeEventBar : '' }` } 
                style={{ 
                    width, flexBasis : width, 
                    pointerEvents : isSelecting ? 'none' : 'auto', 
                    backgroundColor : color ? color : '',
                    height,
                    top,
                    left
                }}
                onClick={ this.onClickEvent } onMouseDown={ this.mouseDown } onMouseMove={ this.moveMouse }>
                { useTime && <Label className={ styles.timeLabel } text={ time } /> }
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
    isStart : PropTypes.bool.isRequired,
    useTime : PropTypes.bool.isRequired,
    width : PropTypes.string.isRequired,
    onSelectEvent : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired
};

export default EventBar;