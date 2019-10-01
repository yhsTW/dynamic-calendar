import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const More = ({ more, openPopup }) => {
    const showMore = e => {
        e.stopPropagation();

        openPopup();
    };

    return (
        <span className={ styles.more } onMouseDown={ showMore }>+{ more } more</span>
    );
};

More.propTypes = {
    more : PropTypes.number.isRequired,
    openPopup : PropTypes.func.isRequired
};

export default More;