import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import BackgroundCell from '../BackgroundCell';
import styles from './styles.css';
import moment from 'moment';
import { makeTimeFormat } from '../../utils/dateUtil';
import { CUSTOMIZE } from '../../utils/constants';

const TimeSlot = ({ items, week, customize, select, onSelectSlot, currentView }) => (
    <div className={ styles.timeSlot } style={ !week && customize[CUSTOMIZE.backgroundCell].useBorder ? { ...customize[CUSTOMIZE.backgroundCell].borderStyle, marginLeft : '-1px', marginBottom : '-1px' } : {} }>
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
                                <BackgroundCell key={ `${ newDate }_${ item.type }` } isMore={ false } isToday={ false } 
                                    item={{ ...item, date : newDate }} more={ 0 } openPopup={ () => {} } { ...select }
                                    customize={ customize } onSelectSlot={ onSelectSlot } currentView={ currentView }
                                    useTime={ true } />
                            );
                        })
                    }
                </Fragment>
            )
        }
    </div>
);

TimeSlot.propTypes = {
    currentView : PropTypes.string,
    customize : PropTypes.shape({
        BackgroundCell : PropTypes.shape({
            borderStyle : PropTypes.object.isRequired,
            selectStyle : PropTypes.object.isRequired,
            useBorder : PropTypes.bool.isRequired
        })
    }),
    items : PropTypes.arrayOf(PropTypes.shape({
        date : PropTypes.instanceOf(moment),
        type : PropTypes.string.isRequired
    }).isRequired).isRequired,
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
    week : PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
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
    onSelectSlot : PropTypes.func
};

export default TimeSlot;