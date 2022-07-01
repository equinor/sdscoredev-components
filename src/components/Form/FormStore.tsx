import { useCombinedReducers } from 'hooks/useCombinedReducer';
import React, { createContext, useReducer } from 'react';
import { FormStoreProps } from './types';

export const StateContext = createContext({});
export const DispatchContext = createContext({});

export const FormStore: React.FC<FormStoreProps> = (props) => {
    const { children, reducers } = props;
    const plugins: Array<any> = [];

    Object.entries(reducers).forEach((reducer: any) => {
        const component = reducer[1].component;
        if (component) {
            plugins.push(component);
        }
    });

    /**
     * Combines the reducers by mapping the object into useReducer hooks
     */
    const [state, dispatch] = useCombinedReducers(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        Object.fromEntries(
            Object.entries(reducers).map(([name, reducer]: any) => [
                name,
                useReducer(reducer.reducer, reducer.initialState),
            ]),
        ),
    );

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <>
                    {children}
                    {plugins.map((plugin: any) => {
                        return <React.Fragment key={plugin.name}>{plugin({ state, dispatch })}</React.Fragment>;
                    })}
                </>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};
