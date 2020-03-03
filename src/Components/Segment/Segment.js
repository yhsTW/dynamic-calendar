import React, { Component } from 'react';
import moment from 'moment';
import { WEEK_NUM } from '../../utils/constants';
import { variablesCheck, objectCheck } from '../../utils/changeCheck';

class Segment extends Component {
    
    shouldComponentUpdate = nextProps => {
        const { prevEventDay, event } = this.props;
        const checkPrevEventDay = variablesCheck(prevEventDay, nextProps.prevEventDay);
        const checkEvent = objectCheck(event, nextProps.event);

        return !(checkPrevEventDay && checkEvent);
    };

    getStartDay = () => {
        const { event, eventProperty : { start : startKey } } = this.props;

        return moment(event[startKey]).day();
    };

    getWidth = () => {
        const { getStartCondition, event, prevEventDay, idx } = this.props;
        let width = 0;

        if(getStartCondition(event)) {
            if(idx > 0) {
                width = `calc(100% * ${ this.getStartDay() - prevEventDay - 1 }/${ WEEK_NUM })`;
            } else {
                width = `calc(100% * ${ this.getStartDay() }/${ WEEK_NUM })`;
            }
        }

        return width;
    };

    render() {
        return (
            <div style={{ width : this.getWidth(), flexBasis : this.getWidth() }}></div>
        );
    };
};

export default Segment;