import React from 'react';
import { CustomizeConsumer } from '../contexts/customize';
import { CUSTOMIZE } from '../utils/constants';

const withCustomize = position => WrappedComponent => {
    const WithCustomize = props => {

        return (
            <CustomizeConsumer>
                { 
                    ({ getHeaderCustomize, getViewCustomize }) => 
                        <WrappedComponent { ...props } getCustomize={ position === CUSTOMIZE.header ? getHeaderCustomize : getViewCustomize } />
                }
            </CustomizeConsumer>
        );
    };

    return WithCustomize;
};

export default withCustomize;