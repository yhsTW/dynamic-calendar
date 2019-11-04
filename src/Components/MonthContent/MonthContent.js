import React from 'react';
import Row from '../Row';
import getDateArr from '../../utils/getDateArr';
import withSelection from '../../hoc/withSelection';
import { CUSTOMIZE } from '../../utils/constants';

const MonthContent = props => getDateArr(props.currentDate).map((itemArr, idx) => (
        <Row key={ idx } { ...props } itemArr={ itemArr } { ...props.select } events={ props.events[idx] }
            customizeList={[
                CUSTOMIZE.today, CUSTOMIZE.holiday, CUSTOMIZE.weekdays, 
                CUSTOMIZE.weekend, CUSTOMIZE.prevMonth, CUSTOMIZE.nextMonth,
                CUSTOMIZE.backgroundCell, CUSTOMIZE.more
            ]}/>
    )
);

export default withSelection(MonthContent);