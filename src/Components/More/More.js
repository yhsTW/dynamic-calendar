import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const More = ({ more, openPopup, customize }) => {
    const { moreStyle, prefix, suffix, position } = customize;

    const showMore = e => {
        e.stopPropagation();

        openPopup();
    };

    return (
        <span className={ styles.more } style={ moreStyle } onMouseDown={ showMore }>
            { `${ prefix }${ more }${ suffix }` }
        </span>
    );
};

More.propTypes = {
    more : PropTypes.number.isRequired,
    customize : PropTypes.shape({
        moreStyle : PropTypes.object,
        position : PropTypes.object,
        prefix : PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
        suffix : PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    }).isRequired,
    openPopup : PropTypes.func.isRequired
};

export default More;