import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import withCustomize from '../../hoc/withCustomize';
import { CUSTOMIZE } from '../../utils/constants';

const More = ({ more, openPopup, getCustomize }) => {
    const { 
        [CUSTOMIZE.more] : { moreStyle, numFrontText, numBackText, position } 
    } = getCustomize([CUSTOMIZE.more]);

    const showMore = e => {
        e.stopPropagation();

        openPopup();
    };

    return (
        <span className={ styles.more } style={ moreStyle } onMouseDown={ showMore }>
            { `${ numFrontText }${ more }${ numBackText }` }
        </span>
    );
};

More.propTypes = {
    more : PropTypes.number.isRequired,
    openPopup : PropTypes.func.isRequired
};

export default withCustomize(CUSTOMIZE.view)(More);