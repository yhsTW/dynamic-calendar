import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const More = ({ more, openPopup, customizeMore : { moreStyle, numBackText, numFrontText } }) => {
    const showMore = e => {
        e.stopPropagation();

        openPopup();
    };

    return (
        <span className={ styles.more } style={ moreStyle } onMouseDown={ showMore }>{ `${ numFrontText }${ more }${ numBackText }` }</span>
    );
};

More.propTypes = {
    more : PropTypes.number.isRequired,
    openPopup : PropTypes.func.isRequired
};

export default More;