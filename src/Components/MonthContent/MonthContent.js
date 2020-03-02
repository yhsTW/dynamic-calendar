import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import getDateArr from '../../utils/getDateArr';
import { VIEW_TYPE } from '../../utils/constants';
import { dateCheck, variablesCheck, arrayCheck, objectCheck } from '../../utils/changeCheck';
import withSelection from '../../hoc/withSelection';
import Row from '../Row';

class MonthContent extends Component {
    prevDate = null;
    prevDateArr = [];
    
    shouldComponentUpdate = nextProps => {
        const { limit, currentDate, currentView, events, select, usePopup } = this.props;

        const checkLimit = variablesCheck(limit, nextProps.limit);
        const checkCurrentView = variablesCheck(currentView, nextProps.currentView);
        const checkCurrentDate = dateCheck(currentDate, nextProps.currentDate);
        const checkEvents = arrayCheck(events, nextProps.events);
        const checkSelect = objectCheck(select, nextProps.select);
        const checkUsePopup = variablesCheck(usePopup, nextProps.usePopup);

        return !(
            checkLimit && checkCurrentDate && checkCurrentView && checkEvents && 
            checkSelect && checkUsePopup
        );
    };

    render() {
        const { currentDate, select, events } = this.props;

        return (
            <Fragment>
                {
                    getDateArr(currentDate).map((itemArr, idx) => (
                        <Row key={ new Date(itemArr[0].date).getTime() } { ...this.props } itemArr={ itemArr } { ...select } events={ events[idx] } />
                    ))
                }
            </Fragment>
        );
    };
};

MonthContent.propTypes = {
    currentDate : PropTypes.instanceOf(moment).isRequired,
    currentView : PropTypes.oneOf([VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day]).isRequired,
    events : PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number,
        title : PropTypes.string,
        start : PropTypes.instanceOf(Date),
        end : PropTypes.instanceOf(Date),
        color : PropTypes.string,
        allDay : PropTypes.bool
    }))),
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