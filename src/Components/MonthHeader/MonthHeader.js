import React from 'react';
import Label from '../Label';
import { WEEK_DATA, CUSTOMIZE } from '../../utils/constants';
import styles from './styles.css';
import withCustomize from '../../hoc/withCustomize';

const MonthHeader = ({ getCustomize }) => {
    const { [CUSTOMIZE.weekend] : { dateHeaderStyle } } = getCustomize([CUSTOMIZE.weekend]);

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

    return (
        <div className={ styles.monthHeader }>
            {
                WEEK_DATA.map((week, idx) => (
                    <Label key={ week } className={ styles.label } text={ week } customize={ getMonthHeaderStyle(idx, dateHeaderStyle) } />
                ))
            }
        </div>
    );
}

export default withCustomize(CUSTOMIZE.view)(MonthHeader);