import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import EventBarWrapper from '../EventBarWrapper';
import moment from 'moment';
import { WEEK_NUM, VIEW_TYPE } from '../../utils/constants';
import styles from './styles.css';

const EventRow = ({ events, slotStart, slotEnd, onSelectEvent, eventRowRef, isSelecting, startSelecting, currentView, components }) => {
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
        let segmentWidth = 0;

        if(getStartCondition(event)) {
            if(idx > 0) {
                segmentWidth = `calc(100% * ${ moment(event.start).day() - moment(events[idx - 1].end).day() - 1 }/${ WEEK_NUM })`;
            } else {
                segmentWidth = `calc(100% * ${ moment(event.start).day() }/${ WEEK_NUM })`;
            }
        }

        return segmentWidth;
    };

    const getEventBarWidth = (event) => {
        const start = moment(event.start);
        const end = moment(event.end);
        let width = 0;

        if(currentView !== VIEW_TYPE.day) {
            // 당일 일정 or 일정의 주(week)가 같은 일정
            if(start.isSame(end) || (getStartCondition(event) && getEndCondition(event))) {
                width = end.day() - start.day() + 1;
            } else {
                width = WEEK_NUM;
                
                if(!getStartCondition(event) && getEndCondition(event)) {
                    width = end.day() + 1;
                } else if(getStartCondition(event) && !getEndCondition(event)) {
                    width = WEEK_NUM - start.day();
                }
            }

            return `calc(100% * ${ width }/${ WEEK_NUM })`;
        } else {
            return `100%`;
        }
    };

    return (
        <div className={ styles.eventRow } ref={ eventRowRef }>
            {
                events.map((event, idx) => (
                    <Fragment key={ event.id }>
                        { currentView !== VIEW_TYPE.day && <div className="segment" style={{ width : getSegmentWidth(event, idx), flexBasis : getSegmentWidth(event, idx) }}></div> }
                        <EventBarWrapper event={ event } width={ getEventBarWidth(event) } isStart={ getStartCondition(event) } 
                            isEnd={ getEndCondition(event) } onSelectEvent={ onSelectEvent } isSelecting={ isSelecting }
                            startSelecting={ startSelecting } components={ components } />
                    </Fragment>
                ))
            }
        </div>
    );
};

EventRow.propTypes = {
    currentView : PropTypes.string.isRequired,
    eventRowRef : PropTypes.object,
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
        color : PropTypes.string,
        allDay : PropTypes.bool
    })),
    isSelecting : PropTypes.bool.isRequired,
    slotEnd : PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.oneOf(['prev', 'current', 'next']).isRequired
    }),
    slotStart : PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.oneOf(['prev', 'current', 'next']).isRequired
    }),
    components : PropTypes.shape({
        header : PropTypes.elementType,
        dateSlot : PropTypes.elementType,
        eventBar : PropTypes.oneOfType([PropTypes.elementType, PropTypes.shape({
            components : PropTypes.instanceOf(Map).isRequired,
            key : PropTypes.string.isRequired
        })]),
        popup : PropTypes.elementType
    }),
    onSelectEvent : PropTypes.func.isRequired,
    startSelecting : PropTypes.func.isRequired
};

export default EventRow;