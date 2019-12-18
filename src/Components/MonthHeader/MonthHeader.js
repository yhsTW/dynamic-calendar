import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import { WEEK_DATA } from '../../utils/constants';
import styles from './styles.css';

const MonthHeader = ({ customize }) => {
    const { dateHeaderStyle } = customize;

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

MonthHeader.propTypes = {
    customize : PropTypes.shape({
        dateHeaderStyle : PropTypes.shape({
            saturdayStyle : PropTypes.object,
            sundayStyle : PropTypes.object
        }).isRequired
    }).isRequired
};

export default MonthHeader;