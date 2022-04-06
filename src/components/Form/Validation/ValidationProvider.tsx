import React, { createContext, useReducer } from 'react';
import { useCombinedReducers } from '../../utils';
import { validationReducer } from './validationReducer';

export const ValidationStateContext = createContext({});
export const ValidationDispatchContext = createContext({});

export type ValidationProviderProps = {
    reducers?: any;
}

export const ValidationProvider: React.FC<ValidationProviderProps> = (props) => {
    const { children, reducers } = props;
    const plugins: Array<any> = [];

    Object.entries({ ...reducers, validationReducer }).forEach((reducer: any) => {
            const component = reducer[1].component;
            if (component) {
                plugins.push(component)
            }
    })

    /**
     * Combines the reducers by mapping the object into useReducer hooks
     */
    const [state, dispatch] = useCombinedReducers(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        Object.fromEntries(Object.entries({ ...reducers, validationReducer }).map(([name, reducer]: any) => [name, useReducer(reducer.reducer, reducer.initialState)]))
    );

    return (
        <ValidationDispatchContext.Provider value={dispatch}>
            <ValidationStateContext.Provider value={state}>
                {children}
            </ValidationStateContext.Provider>
        </ValidationDispatchContext.Provider>
    );
}