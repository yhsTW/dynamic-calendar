import React, { Fragment } from 'react';
import Label from '../Label';
import BackgroundCell from '../BackgroundCell';
import styles from './styles.css';

const TimeSlot = ({ items, week, customizeTimeSlot, select, onSelectSlot, onSelectEvent }) => (
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
                        items.map(item => (
                            <BackgroundCell key={ `${ item.date }_${ item.type }` } isMore={ false } isToday={ false } 
                                item={ item } more={ 0 } openPopup={ () => {} } 
                                customizeBackgroundCell={ customizeTimeSlot } { ...select } onSelectSlot={ onSelectSlot }
                                onSelectEvent={ onSelectEvent } />
                        ))
                    }
                </Fragment>
            )
        }
    </div>
);


export default TimeSlot;