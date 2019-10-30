import React, { createContext } from 'react';

const { Provider, Consumer : CustomizeConsumer } = createContext(null);

const CustomizeProvider = ({ value, children }) => {
    const getHeaderCustomize = keyNames => {
        return getSubProperty(value.Header, keyNames);
    };

    const getViewCustomize = keyNames => {
        return getSubProperty(value.View, keyNames);
    };

    const getSubProperty = (parents, keyNames = []) => {
        
        let customize = {};

        for(let i = 0; i < keyNames.length; i++) {
            customize[keyNames[i]] = parents[keyNames[i]]
        }

        if(keyNames.length === 0) customize = { ...parents };

        return customize;
    };

    const action = {
        getHeaderCustomize,
        getViewCustomize
    };

    return (
        <Provider value={ action } >
            { children }
        </Provider>
    );
};

export {
    CustomizeProvider,
    CustomizeConsumer
};