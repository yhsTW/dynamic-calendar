import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WEEK_DATA } from '../../utils/constants';
import { objectCheck } from '../../utils/changeCheck';
import Label from '../Label';
import styles from './styles.css';

class MonthHeader extends Component {

    shouldComponentUpdate = nextProps => {
        const { customize } = this.props;
        const customizeCheck = objectCheck(customize, nextProps.customize);

        return !(customizeCheck);
    };

    getMonthHeaderStyle = idx => {
        const { customize : { dateHeaderStyle } } = this.props;
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

    render() {
        return (
            <div className={ styles.monthHeader }>
                {
                    WEEK_DATA.map((week, idx) => (
                        <Label key={ week } className={ styles.label } text={ week } customize={ this.getMonthHeaderStyle(idx) } />
                    ))
                }
            </div>
        );
    };
};

MonthHeader.propTypes = {
    customize : PropTypes.shape({
        dateHeaderStyle : PropTypes.shape({
            saturdayStyle : PropTypes.object,
            sundayStyle : PropTypes.object
        }).isRequired
    }).isRequired
};

export default MonthHeader;