import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeTimeFormat } from '../../utils/dateUtil';
import sortEventsUtil from '../../utils/sortEvents';
import withSelection from '../../hoc/withSelection';
import TimeSlot from '../TimeSlot';
import TimeEventWrapper from '../TimeEventWrapper';
import styles from './styles.css';

class TimeColumn extends Component {
    state = {
        totalHeight : 0
    };

    componentDidMount = () => {
        // window.addEventListener('mouseleave', this.props.select.stopSelecting);
        // window.addEventListener('mouseout', this.props.select.stopSelecting);
        this.getTotalHeight();
    };

    // componentWillUnmount = () => {
    //     window.removeEventListener('mouseleave', this.props.select.stopSelecting);
    //     window.removeEventListener('mouseout', this.props.select.stopSelecting);
    // };

    getTotalHeight = () => {
        const { height } = this.backgroundColumnRef.getBoundingClientRect();

        this.setState({
            totalHeight : height
        });
    };

    isBetween = (date, rangeDate, inclusivity = '[)') => {
        return moment(date).isBetween(rangeDate.start, rangeDate.end, null, inclusivity);
    };

    getEventLevel = (event, group) => {
        const { eventProperty : { id : idKey, start : startKey, end : endKey } } = this.props;
        const prevEvents = group.filter(current => (
            this.isBetween(event[startKey], current) || this.isBetween(event[endKey], current, '()')
        ) && current);

        const nextEvents = group.filter(current => (
            current.id !== event[idKey] &&
            (this.isBetween(current.start, event, '()'))
        ) && current);

        const filterEvents = [...prevEvents, ...nextEvents];
        const findIndex = filterEvents.findIndex(find => find[idKey] === event[idKey]);

        return {
            level : findIndex + 1,
            row : [...prevEvents, ...nextEvents]
        };
    };

    getStyle = (event, group) => {
        const { eventProperty : { id : idKey } } = this.props;
        const { level, row } = this.getEventLevel(event, group);
        let width = 100,
            left = 0;
        
        if(level > 0) left = `calc((100% / ${ group.length }) * ${ level - 1 })`;
        if(event[idKey] === row[row.length - 1][idKey]) {
            width = `calc(${ width }% - ${ left })`;
        } else {
            width = (width / group.length) * 1.7;
        }

        return {
            width : width.toString().includes('calc') ? width : `${ width }%`,
            left
        };
    };

    makeStyle = eventGroup => {
        let returnGroup = [];

        for(let i = 0; i < eventGroup.length; i++) {
            const currentGroup = eventGroup[i];

            for(let j = 0; j < currentGroup.length; j++) {
                const currentEvent = currentGroup[j];

                const style = this.getStyle(currentEvent, currentGroup);
                let newEvent = {
                    ...currentEvent,
                    style
                };

                returnGroup.push(newEvent);
            }
        }

        return returnGroup;
    };

    makeLayout = () => {
        const { events } = this.props;

        if(!events) return;

        const { eventProperty, eventProperty : { start : startKey, end : endKey } } = this.props;
        const sEvents = sortEventsUtil(events, eventProperty);
        let notOverlap = [];
        let overlap = [];

        while(sEvents.length > 0) {
            const currentEvent = sEvents.shift();
            const overlapEvents = sEvents.filter(event => (
                (
                    this.isBetween(event[startKey], currentEvent) || this.isBetween(event[endKey], currentEvent)
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

        let eventGroup = this.makeStyle([...notOverlap, ...overlap]);
        
        return eventGroup;
    };

    getSlotStyle = () => {
        const { customize } = this.props;

        return customize;
    };

    render() {
        const { totalHeight } = this.state;
        const { 
            itemArr, week, select, onSelectSlot, currentView,
            events, eventProperty : { id : idKey, start : startKey, end : endKey }, onSelectEvent,
            eventProperty
        } = this.props;

        return (
            <div className={ styles.timeColumn }>
                <div className={ styles.backgroundColumn } ref={ ref => this.backgroundColumnRef = ref }>
                    {
                        itemArr.map((item, index) => (
                            <TimeSlot key={ `${ item[0].date }${ week ? `_${ week.date }` : '' }_${ index }` } items={ item } week={ week } 
                                select={ select } onSelectSlot={ onSelectSlot } currentView={ currentView } customize={ this.getSlotStyle() } />
                        ))
                    }
                </div>
                <div className={ styles.contentColumn }>
                    {
                        week && events && this.makeLayout().map(event => 
                            <TimeEventWrapper key={ event[idKey] } event={ event } isStart={ true } isEnd={ true } isSelecting={ select.isSelecting }
                                   startSelecting={ select.startSelecting } width={ event.style.width } onSelectEvent={ onSelectEvent }
                                   totalHeight={ totalHeight } useTime={ true } time={ `${ makeTimeFormat(event[startKey]) } - ${ makeTimeFormat(event[endKey]) }` }
                                   left={ `${ event.style.left }` } eventProperty={ eventProperty } itemArr={ itemArr } />
                        )
                    }
                </div>
            </div>
        );
    };
};

TimeColumn.propTypes = {
    currentView : PropTypes.string,
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number,
        title : PropTypes.string,
        start : PropTypes.instanceOf(Date),
        end : PropTypes.instanceOf(Date),
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
    customize : PropTypes.shape({
        BackgroundCell : PropTypes.shape({
            useBorder : PropTypes.bool,
            borderStyle : PropTypes.object,
            selectStyle : PropTypes.object
        }),
        Popup : PropTypes.shape({}),
        More : PropTypes.shape({
            prefix : PropTypes.string,
            suffix : PropTypes.string,
            moreStyle : PropTypes.object,
            position : PropTypes.shape({
                alignItems : PropTypes.string,
                justifyContent : PropTypes.string
            })
        }),
        today : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        holiday : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        weekend : PropTypes.shape({
            saturdayStyle : PropTypes.object,
            sundayStyle : PropTypes.object
        }),
        weekdays : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        prevMonth : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        }),
        nextMonth : PropTypes.shape({
            dateHeaderStyle : PropTypes.object,
            backgroundCellStyle : PropTypes.object
        })
    }),
    onSelectEvent : PropTypes.func,
    onSelectSlot : PropTypes.func
};

export default withSelection(TimeColumn);