import React from 'react';
import styles from './styles.css';
import TimeColumn from '../TimeColumn';
import getTimeArr from '../../utils/getTimeArr';

const TimeContent = ({ today, weekArr, currentView, customizeTimeContent, select, onSelectSlot, events, onSelectEvent }) => {

    const timeArr = getTimeArr();
    
    return (
        <div className={ styles.timeContent }>
            <div className={ styles.timeContentHeader }>
                <TimeColumn itemArr={ timeArr } customizeTimeColumn={ customizeTimeContent } />
            </div>
            <div className={ styles.timeContents }>
                { 
                    weekArr.map(week => (
                            <TimeColumn key={ `${ week.date }_${ week.type }` } itemArr={ timeArr } week={ week } 
                                customizeTimeColumn={ customizeTimeContent } select={ select } onSelectSlot={ onSelectSlot }
                                onSelectEvent={ onSelectEvent } />
                        )
                    ) 
                }
            </div>
        </div>
    );
};

export default TimeContent;