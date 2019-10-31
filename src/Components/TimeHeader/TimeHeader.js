import React from 'react';
import Label from '../Label';
import { MONTH_HEADER_DATA, CUSTOMIZE } from '../../utils/constants';
import styles from './styles.css';
import TimeAllDay from '../TimeAllDay/TimeAllDay';
import withCustomize from '../../hoc/withCustomize';
import { getStyle } from '../../utils/utils';
import { PROPERTY } from '../../utils/constants';

const TimeHeader = ({ today, weekArr, currentView, onSelectSlot, events, onSelectEvent, getCustomize }) => {
    const isToday = date => {
        return date.isSame(today, 'date');
    };

    const getTimeHeaderStyle = week => {
        const styleObj = getCustomize([CUSTOMIZE.today, CUSTOMIZE.weekend, CUSTOMIZE.weekdays]);
        const dateHeaderStyle = getStyle({ 
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
                                text={ `${ week.date.date() } ${ MONTH_HEADER_DATA[week.date.day()] }` } />
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

export default withCustomize(CUSTOMIZE.view)(TimeHeader);