import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import getDateArr from '../../utils/getDateArr';
import withSelection from '../../hoc/withSelection';
import { VIEW_TYPE } from '../../utils/constants';
import moment from 'moment';

const MonthContent = props => getDateArr(props.currentDate).map((itemArr, idx) => (
        <Row key={ idx } { ...props } itemArr={ itemArr } { ...props.select } events={ props.events[idx] } />
    )
);

MonthContent.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    events : PropTypes.arrayOf(PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            title : PropTypes.string.isRequired,
            start : PropTypes.instanceOf(Date).isRequired,
            end : PropTypes.instanceOf(Date).isRequired,
            color : PropTypes.string,
            allDay : PropTypes.bool
        })
    )),
    limit : PropTypes.number.isRequired,
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
    selectable : PropTypes.bool.isRequired,
    today : PropTypes.instanceOf(moment).isRequired,
    useExtend : PropTypes.bool.isRequired,
    components : PropTypes.shape({
        header : PropTypes.elementType,
        dateSlot : PropTypes.elementType,
        eventBar : PropTypes.oneOfType([PropTypes.elementType, PropTypes.shape({
            components : PropTypes.instanceOf(Map).isRequired,
            key : PropTypes.string.isRequired
        })]),
        popup : PropTypes.elementType
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
    }).isRequired,
    moveDayView : PropTypes.func.isRequired,
    onSelectEvent : PropTypes.func.isRequired,
    onSelectSlot : PropTypes.func.isRequired,
    openPopup : PropTypes.func.isRequired,
    setLimit : PropTypes.func.isRequired
};

export default withSelection(MonthContent);