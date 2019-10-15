import React, { Fragment } from 'react';
import Label from '../Label';
import BackgroundCell from '../BackgroundCell';
import styles from './styles.css';
import moment from 'moment';

const TimeSlot = ({ items, week, customizeTimeSlot, select, onSelectSlot, onSelectEvent, currentView }) => (
    <div className={ styles.timeSlot }>
        { 
            !week && (
                <Fragment>
                    <Label className={ styles.timeSlotContent } 
                        text={ `${ items[0].date.hour() === 0 ? 12 : items[0].date.hour() }:${ items[0].date.minute().toString().length < 2 ? `0${ items[0].date.minute() }` : items[0].date.minute()  } ${ items[0].date.hour() > 12 ? 'PM' : 'AM' }` } />
                    <Label className={ styles.timeSlotContent } text={ '' } />
                </Fragment>
            )
        }
        {
            week && (
                <Fragment>
                    { 
                        items.map(item => {
                            const newDate = moment(week.date).set({ hour : item.date.hour(), minute : item.date.minute(), second : item.date.second() });

                            return (
                                (
                                    <BackgroundCell key={ `${ newDate }_${ item.type }` } isMore={ false } isToday={ false } 
                                        item={{ ...item, date : newDate }} more={ 0 } openPopup={ () => {} } { ...select }
                                        customizeBackgroundCell={ customizeTimeSlot } onSelectSlot={ onSelectSlot }
                                        onSelectEvent={ onSelectEvent } currentView={ currentView } />
                                )
                            )
                        })
                    }
                </Fragment>
            )
        }
    </div>
);


export default TimeSlot;