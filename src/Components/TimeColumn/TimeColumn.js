import React from 'react';
import PropTypes from 'prop-types';
import TimeSlot from '../TimeSlot';
import withSelection from '../../hoc/withSelection';
import EventBar from '../EventBarWrapper';
import styles from './styles.css';
import moment from 'moment';
import { makeTimeFormat } from '../../utils/dateUtil';
import sortEventsUtil from '../../utils/sortEvents';
import withCustomize from '../../hoc/withCustomize';
import { CUSTOMIZE } from '../../utils/constants';

const TimeColumn = ({ itemArr, week, select, onSelectSlot, onSelectEvent, currentView, events, getCustomize }) => {
    const getEventBarHeight = event => {
        const start = moment(event.start);
        const end = moment(event.end);
        const hour = (end.hour() - start.hour()) * 60;
        const min = start.minute() + end.minute();
        const gap = (hour + min) / 30;
        
        // 30분 때문에
        return `calc((100% * ${ gap })/${ itemArr.length * 2 })`;
    };

    const getEventBarTop = event => {
        const startHour = moment(event.start).hour();

        return `calc((100% * ${ (startHour * 60) / 30 }) / ${ itemArr.length * 2 })`;
    };

    const isBetween = (date, rangeDate, inclusivity = '[)') => {
        return moment(date).isBetween(rangeDate.start, rangeDate.end, null, inclusivity);
    };

    const getEventLevel = (event, group) => {
        const prevEvents = group.filter(current => (
            isBetween(event.start, current) || isBetween(event.end, current, '()')
        ) && current);

        const nextEvents = group.filter(current => (
            current.id !== event.id &&
            (isBetween(current.start, event, '()'))
        ) && current);

        const filterEvents = [...prevEvents, ...nextEvents];
        const findIndex = filterEvents.findIndex(find => find.id === event.id);

        return {
            level : findIndex + 1,
            row : [...prevEvents, ...nextEvents]
        };
    };

    const getStyle = (event, group) => {
        const { level, row } = getEventLevel(event, group);
        let width = 100,
            left = 0;
            
        if(level > 0) left = `calc((100% / ${ group.length }) * ${ level - 1 })`;
        if(event.id === row[row.length - 1].id) {
            width = `calc(${ width }% - ${ left })`;
        } else {
            width = (width / group.length) * 1.7;
        }

        return {
            width : width.toString().includes('calc') ? width : `${ width }%`,
            left
        };
    };

    const makeStyle = eventGroup => {
        let returnGroup = [];

        for(let i = 0; i < eventGroup.length; i++) {
            const currentGroup = eventGroup[i];

            for(let j = 0; j < currentGroup.length; j++) {
                const currentEvent = currentGroup[j];

                const style = getStyle(currentEvent, currentGroup);
                let newEvent = {
                    ...currentEvent,
                    style
                };

                returnGroup.push(newEvent);
            }
        }

        return returnGroup;
    };

    const makeLayout = () => {
        if(!events) return;

        const sEvents = sortEventsUtil(events);
        let notOverlap = [];
        let overlap = [];

        while(sEvents.length > 0) {
            const currentEvent = sEvents.shift();
            const overlapEvents = sEvents.filter(event => (
                (
                    isBetween(event.start, currentEvent) || isBetween(event.end, currentEvent)
                ) && event
            ));
            
            if(overlapEvents.length > 0) {
                for(let i = 0; i < overlapEvents.length; i++) {
                    sEvents.splice(sEvents.indexOf(overlapEvents[i]), 1);
                }
                overlap.push([currentEvent, ...overlapEvents]);
            } else {
                notOverlap.push([currentEvent]);
            }
        }

        let eventGroup = makeStyle([...notOverlap, ...overlap]);
        
        return eventGroup;
    };

    const getSlotStyle = () => {
        return getCustomize([CUSTOMIZE.backgroundCell]);
    };

    return (
        <div className={ styles.timeColumn }>
            <div className={ styles.backgroundColumn }>
                {
                    itemArr.map((item, index) => (
                        <TimeSlot key={ `${ item[0].date }${ week ? `_${ week.date }` : '' }_${ index }` } items={ item } week={ week } 
                            select={ select } onSelectSlot={ onSelectSlot } currentView={ currentView } customize={ getSlotStyle() } />
                    ))
                }
            </div>
            <div className={ styles.contentColumn }>
                {
                    week && events && makeLayout().map(event => 
                        <EventBar key={ event.id } event={ event } isStart={ true } isEnd={ true } isSelecting={ select.isSelecting }
                            startSelecting={ select.startSelecting } width={ event.style.width } onSelectEvent={ onSelectEvent }
                            height={ getEventBarHeight(event) } top={ getEventBarTop(event) } useTime={ true }
                            time={ `${ makeTimeFormat(event.start) } - ${ makeTimeFormat(event.end) }` } left={ `${ event.style.left }` } />
                    )
                }
            </div>
        </div>
    );
};

TimeColumn.propTypes = {
    currentView : PropTypes.string,
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
        color : PropTypes.string,
        allDay : PropTypes.bool
    })),
    itemArr : PropTypes.arrayOf(PropTypes.arrayOf(
        PropTypes.shape({
            date : PropTypes.instanceOf(moment),
            type : PropTypes.string.isRequired
        }).isRequired
    ).isRequired).isRequired,
    select : PropTypes.shape({
        defaultSelectedDate : PropTypes.instanceOf(moment),
        isSelecting : PropTypes.bool.isRequired,
        lastSelectedDate : PropTypes.instanceOf(moment),
        selectedEnd : PropTypes.instanceOf(moment),
        selectedStart : PropTypes.instanceOf(moment),
        setDefaultSelectedDate : PropTypes.func.isRequired,
        setLastSelectedDate : PropTypes.func.isRequired,
        setSelectedEnd : PropTypes.func.isRequired,
        setSelectedStart : PropTypes.func.isRequired,
        startSelecting : PropTypes.func.isRequired,
        stopSelecting : PropTypes.func.isRequired
    }).isRequired,
    selectable : PropTypes.bool,
    week : PropTypes.shape({
        date : PropTypes.instanceOf(moment),
        type : PropTypes.string.isRequired
    }),
    getCustomize : PropTypes.func.isRequired,
    onSelectEvent : PropTypes.func,
    onSelectSlot : PropTypes.func
};

export default withCustomize(CUSTOMIZE.view)(withSelection(TimeColumn));