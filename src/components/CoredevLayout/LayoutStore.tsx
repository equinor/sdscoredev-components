import React, { createContext, useReducer } from 'react';
import { layoutReducer } from './layoutReducer';

export const StateContext = createContext({});
export const DispatchContext = createContext({});

export const LayoutStore: React.FC = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(layoutReducer.reducer, layoutReducer.initialState);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    );
};
