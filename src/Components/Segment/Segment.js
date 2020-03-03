import React from 'react';
import { WEEK_NUM } from '../../utils/constants';
import moment from 'moment';

const Segment = ({ prevEventDay, idx, event, eventProperty : { start : startKey }, getStartCondition }) => {

    const getStartDay = () => {
        return moment(event[startKey]).day();
    };

    const getSegmentWidth = () => {
        let segmentWidth = 0;

        if(getStartCondition(event)) {
            if(idx > 0) {
                segmentWidth = `calc(100% * ${ getStartDay() - prevEventDay - 1 }/${ WEEK_NUM })`;
            } else {
                segmentWidth = `calc(100% * ${ getStartDay() }/${ WEEK_NUM })`;
            }
        }

        return segmentWidth;
    };

    return (
        <div style={{ width : getSegmentWidth(), flexBasis : getSegmentWidth() }}></div>
    );
};

export default Segment;