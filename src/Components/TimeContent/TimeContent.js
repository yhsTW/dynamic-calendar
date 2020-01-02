import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import TimeColumn from '../TimeColumn';
import getTimeArr from '../../utils/getTimeArr';
import moment from 'moment'
import { VIEW_TYPE } from '../../utils/constants';

const TimeContent = ({ currentDate, today, weekArr, currentView, onSelectSlot, events, onSelectEvent, selectable, customize, eventProperty, eventProperty : { start : startKey } }) => {
    const timeArr = getTimeArr();
    const sortEvents = () => {
        let newEvents = [];

        events.forEach(event => {
            const idx = moment(event[startKey]).day();

            if(!newEvents[idx]) {
                newEvents[idx] = [];
            }

            newEvents[moment(event[startKey]).day()].push(event);
        });

        return newEvents;
    };

    const newEvents = sortEvents();
    
    return (
        <div className={ styles.timeContent }>
            <div className={ styles.timeContentHeader }>
                <TimeColumn itemArr={ timeArr } customize={ customize } eventProperty={ eventProperty } />
            </div>
            <div className={ styles.timeContents }>
                { 
                    weekArr.map(week => (
                        <TimeColumn key={ `${ week.date }_${ week.type }` } itemArr={ timeArr } week={ week } 
                            onSelectSlot={ onSelectSlot } onSelectEvent={ onSelectEvent } currentView={ currentView }
                            events={ newEvents[week.date.day()] } selectable={ selectable } customize={ customize } eventProperty={ eventProperty } />
                    ))
                }
            </div>
        </div>
    );
};

TimeContent.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
        color : PropTypes.string,
        allDay : PropTypes.bool
    })).isRequired,
    selectable : PropTypes.bool.isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    weekArr : PropTypes.arrayOf(PropTypes.shape({
        date : PropTypes.instanceOf(moment),
        type : PropTypes.string.isRequired
    })).isRequired,
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
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired
};

export default TimeContent;