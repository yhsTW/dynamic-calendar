import React from 'react';
import Label from '../Label';
import { MONTH_HEADER_DATA, CUSTOMIZE } from '../../utils/constants';
import styles from './styles.css';
import withCustomize from '../../hoc/withCustomize';

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

const MonthHeader = ({ getCustomize }) => {
    const { [CUSTOMIZE.weekend] : { dateHeaderStyle } } = getCustomize([CUSTOMIZE.weekend]);

    return (
        <div className={ styles.monthHeader }>
            {
                MONTH_HEADER_DATA.map((week, idx) => (
                    <Label key={ week } className={ styles.label } text={ week } customize={ getMonthHeaderStyle(idx, dateHeaderStyle) } />
                ))
            }
        </div>
    );
}

export default withCustomize(CUSTOMIZE.view)(MonthHeader);