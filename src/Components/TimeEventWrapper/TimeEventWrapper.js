import React, { Component } from 'react';
import moment from 'moment';
import EventBar from '../EventBarWrapper';

class TimeEventWrapper extends Component {
    getEventBarHeight = () => {
        const { event, eventProperty : { start : startKey, end : endKey }, totalHeight, itemArr } = this.props;
        const start = moment(event[startKey]);
        const end = moment(event[endKey]);
        const hour = (end.hour() - start.hour()) * 60;
        const min = start.minute() + end.minute();
        const gap = (hour + min) / 30;

        return `calc((${ totalHeight }px * ${ gap })/${ itemArr.length * 2 })`;
    };

    getEventBarTop = () => {
        const { event, eventProperty : { start : startKey }, itemArr, totalHeight } = this.props;
        const startHour = moment(event[startKey]).hour();
        const startMin = moment(event[startKey]).minute();

        return `calc((${ totalHeight }px * ${ ((startHour * 60) + startMin) / 30 }) / ${ itemArr.length * 2 })`;
    };

    render() {
        const {
            event, isStart, isEnd, isSelecting, startSelecting,
            width, onSelectEvent, useTime, time, left, eventProperty,
        } = this.props;

        return (
            <EventBar event={ event } isStart={ isStart } isEnd={ isEnd } isSelecting={ isSelecting }
                startSelecting={ startSelecting } width={ width } onSelectEvent={ onSelectEvent }
                height={ this.getEventBarHeight() } top={ this.getEventBarTop() } useTime={ useTime }
                time={ time } left={ left } eventProperty={ eventProperty } />
        );
    };
};

export default TimeEventWrapper;