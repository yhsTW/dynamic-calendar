import React, { Fragment } from 'react';
import Label from '../Label';
import BackgroundCell from '../BackgroundCell';
import styles from './styles.css';
import moment from 'moment';
import { makeTimeFormat } from '../../utils/utils';

const TimeSlot = ({ items, week, customizeTimeSlot, select, onSelectSlot, onSelectEvent, currentView }) => (
    <div className={ styles.timeSlot }>
        { 
            !week && (
                <Fragment>
                    <Label className={ styles.timeSlotContent } 
                        text={ makeTimeFormat(items[0].date) } />
                    <Label className={ styles.timeSlotContent } text={ '' } />
                </Fragment>
            )
        }
        {
            week && (
                <Fragment>
                    { 
                        items.map(item => {
                            const newDate = moment(week.date).set({ 
                                hour : item.date.hour(), 
                                minute : item.date.minute(), 
                                second : item.date.second()
                            });

                            return (
                                (
                                    <BackgroundCell key={ `${ newDate }_${ item.type }` } isMore={ false } isToday={ false } 
                                        item={{ ...item, date : newDate }} more={ 0 } openPopup={ () => {} } { ...select }
                                        customizeBackgroundCell={ customizeTimeSlot } onSelectSlot={ onSelectSlot }
                                        onSelectEvent={ onSelectEvent } currentView={ currentView }
                                        useTime={ true } />
                                )
                            );
                        })
                    }
                </Fragment>
            )
        }
    </div>
);


export default TimeSlot;