import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ className, text, style }) => (
    <div className={ className }>
        <span style={ style }>{ text }</span>
    </div>
);

Label.propTypes = {
    className : PropTypes.string,
    text : PropTypes.string.isRequired,
    customizeLabel : PropTypes.shape({
        format : PropTypes.string,
        style : PropTypes.object
    }),
    style : PropTypes.object
};

export default Label;