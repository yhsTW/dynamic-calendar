import React from 'react';
import Label from '../Label';
import { MONTH_HEADER_DATA, CUSTOMIZE } from '../../utils/constants';
import styles from './styles.css';
import TimeAllDay from '../TimeAllDay/TimeAllDay';
import withCustomize from '../../hoc/withCustomize';

const TimeHeader = ({ today, weekArr, currentView, onSelectSlot, events, onSelectEvent, getCustomize }) => {
    const getTodayStyle = () => {
        const { [CUSTOMIZE.today] : { dateHeaderStyle } } = getCustomize([CUSTOMIZE.today]);
        
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
                        weekArr.map(({ date }) => (
                            <Label key={ date } customize={ date.isSame(today, 'date') ? getTodayStyle() : {} } 
                                className={ styles.timeHeaderItem } text={ `${ date.date() } ${ MONTH_HEADER_DATA[date.day()] }` } />
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