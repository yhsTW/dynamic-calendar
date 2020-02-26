import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import DateSlot from '../DateSlot';

class DateSlotWrapper extends Component {

    shouldComponentUpdate = nextProps => {
        return !_.isEqual(this.props.itemArr, nextProps.itemArr);
    };

    getDateSlotCustomize = () => {
        const { customize : { today, holiday, weekdays, weekend, prevMonth, nextMonth } } = this.props;

        return {
            today,
            holiday,
            weekdays,
            weekend, 
            prevMonth,
            nextMonth
        };
    };

    render() {
        const { itemArr, today, moveDayView, isSelecting, startSelecting } = this.props;
        const dateSlotCustomize = this.getDateSlotCustomize();

        return (
            <Fragment>
                {
                    itemArr.map(item => (
                        <DateSlot key={ `${ item.type }_${ item.date.date() }` } 
                            isToday={ today.isSame(item.date, 'date') } item={ item } customize={ dateSlotCustomize }
                            moveDayView={ moveDayView } isSelecting={ isSelecting } startSelecting={ startSelecting } />
                    ))            
                }
            </Fragment>
        );
    };
};

export default DateSlotWrapper;