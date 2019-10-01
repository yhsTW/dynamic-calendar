import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import EventBar from '../EventBar';
import moment from 'moment';
import styles from './styles.css';

const EventRow = ({ events, slotStart, slotEnd, onSelectEvent, eventRowRef, isSelecting, startSelecting }) => {
    const getStartCondition = (event) => {
        const slotStartDate = moment(slotStart.date);
        const start = moment(event.start);

        return start.isAfter(slotStartDate) || slotStartDate.isSame(start, 'week');
    };

    const getEndCondition = (event) => {
        const slotEndDate = moment(slotEnd.date);
        const end = moment(event.end);

        return slotEndDate.isAfter(end) || slotEndDate.isSame(end, 'week');
    };

    const getSegmentWidth = (event, idx) => {
        // console.log('===================================');
        // console.log('event, idx : ', event, idx);
        let segmentWidth = 0;

        if(getStartCondition(event)) {
            if(idx > 0) {
                // segmentWidth = `calc(100% * ${ moment(events[idx - 1].end).day() - moment(event.start).day() }/7)`;
                segmentWidth = `calc(100% * ${ moment(event.start).day() - moment(events[idx - 1].end).day() - 1 }/7)`;
            } else {
                segmentWidth = `calc(100% * ${ moment(event.start).day() }/7)`;
            }
        }

        // console.log('===================================');

        return segmentWidth;
    };

    const getEventBarWidth = (event) => {
        const start = moment(event.start);
        const end = moment(event.end);
        let width = 0;

        // 당일 일정 or 일정의 주(week)가 같은 일정
        if(start.isSame(end) || (getStartCondition(event) && getEndCondition(event))) {
            width = end.day() - start.day() + 1;
        } else {
            width = 7;
            
            if(!getStartCondition(event) && getEndCondition(event)) {
                width = end.day() + 1;
            } else if(getStartCondition(event) && !getEndCondition(event)) {
                width = 7 - start.day();
            }
        }
        
        return `calc(100% * ${ width }/7)`;
    };
    
    return (
        <div className={ styles.eventRow } ref={ eventRowRef }>
            {
                events.map((event, idx) => (
                    <Fragment key={ event.id }>
                        <div className="segment" style={{ width : getSegmentWidth(event, idx), flexBasis : getSegmentWidth(event, idx) }}></div>
                        <EventBar event={ event } width={ getEventBarWidth(event) } isStart={ getStartCondition(event) } 
                            isEnd={ getEndCondition(event) } onSelectEvent={ onSelectEvent } isSelecting={ isSelecting }
                            startSelecting={ startSelecting } />
                    </Fragment>
                ))
            }
        </div>
    );
};

EventRow.propTypes = {
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired
    })),
    isSelecting : PropTypes.bool.isRequired,
    slotStart : PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.oneOf(['prev', 'current', 'next']).isRequired
    }),
    slotEnd : PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.oneOf(['prev', 'current', 'next']).isRequired
    }),
    eventRowRef : PropTypes.object,
    onSelectEvent : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired
};

export default EventRow;