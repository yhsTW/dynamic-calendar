import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import { WEEK_DATA, VIEW_TYPE } from '../../utils/constants';
import styles from './styles.css';
import TimeAllDay from '../TimeAllDay/TimeAllDay';
import combineStyle from '../../utils/combineStyle';
import { PROPERTY } from '../../utils/constants';
import moment from 'moment';

const TimeHeader = ({ today, weekArr, currentView, onSelectSlot, events, onSelectEvent, selectable, useExtend, customize }) => {
    const isToday = date => {
        return date.isSame(today, 'date');
    };

    const getTimeHeaderStyle = week => {
        const { today, weekend, weekdays } = customize;
        const styleObj = {
            today,
            weekend,
            weekdays
        };
        const dateHeaderStyle = combineStyle({ 
            styleObj, 
            isToday : isToday(week.date), 
            item : week, 
            property : PROPERTY.dateHeaderStyle 
        });

        return dateHeaderStyle;
    };

    return (
        <div className={ styles.timeHeader }>
            <div className={ styles.timeHeaderSegment }>
                <Label text="종일" />
            </div>
            <div className={ styles.timeHeaderContent }>
                <div className={ styles.timeHeaderHeaders }>
                    { 
                        weekArr.map(week => (
                            <Label key={ week.date } customize={ getTimeHeaderStyle(week) } className={ styles.timeHeaderItem } 
                                text={ `${ week.date.date() } ${ WEEK_DATA[week.date.day()] }` } />
                            )
                        )
                    }
                </div>
                <TimeAllDay today={ today } itemArr={ weekArr } useDateHeader={ false } onSelectSlot={ onSelectSlot }
                    events={ events } currentView={ currentView } onSelectEvent={ onSelectEvent } selectable={ selectable }
                    useExtend={ useExtend } customize={ customize } />
            </div>
        </div>
    );
};

TimeHeader.propTypes = {
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
        color : PropTypes.string,
        allDay : PropTypes.bool
    })).isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    weekArr : PropTypes.arrayOf( PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.string.isRequired
    }).isRequired).isRequired,
    useExtend : PropTypes.bool.isRequired,
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

export default TimeHeader;