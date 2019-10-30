import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ className, text, customize }) => (
    <div className={ className }>
        <span style={ customize ? customize : {} }>{ text }</span>
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