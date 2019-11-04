import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import withSelection from '../../hoc/withSelection';
import styles from './styles.css';
import { CUSTOMIZE, VIEW_TYPE } from '../../utils/constants';
import moment from 'moment';

const TimeAllDay = props => (
    <div className={ styles.timeHeaderAllDays }>
        <Row { ...props.select } { ...props } customizeList={[CUSTOMIZE.backgroundCell]} />
    </div>
);

TimeAllDay.propTypes = {
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]),
    events : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        start : PropTypes.instanceOf(Date).isRequired,
        end : PropTypes.instanceOf(Date).isRequired,
        color : PropTypes.string,
        allDay : PropTypes.bool
    })),
    itemArr : PropTypes.arrayOf( PropTypes.shape({
        date : PropTypes.instanceOf(moment).isRequired,
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
    today : PropTypes.instanceOf(moment).isRequired,
    useDateHeader : PropTypes.bool.isRequired,
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired
};

export default withSelection(TimeAllDay);