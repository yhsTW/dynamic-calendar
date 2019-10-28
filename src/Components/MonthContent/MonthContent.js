import React from 'react';
import Row from '../Row';
import { getDateArr } from '../../utils/monthDate';
import withSelection from '../../hoc/withSelection';

const MonthContent = props => getDateArr(props.currentDate).map((itemArr, idx) => (
        <Row key={ idx } { ...props } itemArr={ itemArr } { ...props.select } events={ props.events[idx] } />
    )
);

export default withSelection(MonthContent);