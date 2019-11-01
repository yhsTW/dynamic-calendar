import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import { WEEK_DATA, CUSTOMIZE, VIEW_TYPE } from '../../utils/constants';
import styles from './styles.css';
import TimeAllDay from '../TimeAllDay/TimeAllDay';
import withCustomize from '../../hoc/withCustomize';
import combineStyle from '../../utils/combineStyle';
import { PROPERTY } from '../../utils/constants';
import moment from 'moment';

const TimeHeader = ({ today, weekArr, currentView, onSelectSlot, events, onSelectEvent, getCustomize }) => {
    const isToday = date => {
        return date.isSame(today, 'date');
    };

    const getTimeHeaderStyle = week => {
        const styleObj = getCustomize([CUSTOMIZE.today, CUSTOMIZE.weekend, CUSTOMIZE.weekdays]);
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
                    events={ events } currentView={ currentView } onSelectEvent={ onSelectEvent } />
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
        allDay : PropTypes.bool.isRequired
    })).isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    weekArr : PropTypes.arrayOf( PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
        type : PropTypes.string.isRequired
    }).isRequired).isRequired,
    getCustomize : PropTypes.func.isRequired,
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.view)(TimeHeader);