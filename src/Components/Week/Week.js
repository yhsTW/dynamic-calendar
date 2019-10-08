import React from 'react';
import Label from '../Label';
import { WEEK_INFO } from '../../variables';
import styles from './styles.css';

const getWeekStyle = (idx, dateHeaderStyle) => {
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

const Week = ({ customizeWeek : { weekend : { dateHeaderStyle } } }) =>(
    <div className={ styles.week }>
        {
            WEEK_INFO.map((week, idx) => (
                    <Label key={ week } className={ styles.label } text={ week } style={ getWeekStyle(idx, dateHeaderStyle) } />
            )) 
        }
    </div>
);

export default Week;