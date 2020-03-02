import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class More extends PureComponent {

    showMore = e => {
        e.stopPropagation();
        const { openPopup } = this.props;

        openPopup();
    };

    render() {
        const { customize : { moreStyle, prefix, suffix, position }, more } = this.props;

        return (
            <span className={ styles.more } style={ moreStyle } onMouseDown={ this.showMore }>
                { `${ prefix }${ more }${ suffix }` }
            </span>
        );
    };
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