import React from 'react';
import Label from '../Label';
import { MONTH_HEADER_DATA } from '../../variables';
import styles from './styles.css';

const getMonthHeaderStyle = (idx, dateHeaderStyle) => {
    const { saturdayStyle, sundayStyle } = dateHeaderStyle;
    let style = {};

    switch(idx) {
        case 0 :
            return style = { ...style, ...sundayStyle };

        case 6 :
            return style = { ...style, ...saturdayStyle };

        default : 
            return style;
    }
};

const MonthHeader = ({ customizeWeek : { weekend : { dateHeaderStyle } } }) =>(
    <div className={ styles.monthHeader }>
        {
            MONTH_HEADER_DATA.map((week, idx) => (
                    <Label key={ week } className={ styles.label } text={ week } style={ getMonthHeaderStyle(idx, dateHeaderStyle) } />
            )) 
        }
    </div>
);

export default MonthHeader;