import React, { createContext, ReactElement, useReducer } from 'react';
import { GeneralStoreProps, ReducerProp } from 'types';
import { useCombinedReducers } from '../../hooks/useCombinedReducer';

export const StateContext = createContext({});
export const DispatchContext = createContext({});

export const GanttStore: React.FC<GeneralStoreProps> = React.memo((props) => {
    const { children, components, reducers } = props;

    /**
     * Provides a cache key
     *
     * @param component
     * @returns
     */
    const getCacheKey = (component: any) => {
        return `${window.location.origin + component.props.cacheKey}|${component.type.displayName}`;
    };

    /**
     * Provides a storage
     *
     * @param component
     * @returns
     */
    const getStorage = (component: any) => {
        return component.props.storage || window.sessionStorage;
    };

    /**
     * Provides reducers that are not cached, but declared in the component.
     * The index file of the Plugin must contain `Plugin.reducer = { pluginReducer }`
     *
     * @returns
     */
    const componentReducers = () =>
        Object.fromEntries(
            components
                .filter(
                    (component: ReactElement<any, React.JSXElementConstructor<any> & ReducerProp>) =>
                        component.type.reducer && !component.props['cacheKey'],
                )
                .map((component: ReactElement<any, React.JSXElementConstructor<any> & ReducerProp>) => {
                    if (!component.type.reducer) return [];

                    const [name, reducer]: any = Object.entries(component.type.reducer)[0];
                    return [name, useReducer(reducer.reducer, reducer.initialState)];
                }),
        );

    /**
     * Provides reducers from prop.
     * These are fetched from the `Gantt` prop `reducers`
     *
     * @returns
     */
    const propReducers = () =>
        Object.fromEntries(
            Object.entries(reducers).map(([name, reducer]: any) => [
                name,
                useReducer(reducer.reducer, reducer.initialState),
            ]),
        );

    const [state, dispatch] = useCombinedReducers({
        ...propReducers(),
        ...componentReducers(),
    });

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <>
                    {children}
                    {Object.entries(reducers).map((reducer: any, key: number) => {
                        const { component } = reducer[1];
                        if (component) {
                            // eslint-disable-next-line react/no-array-index-key
                            return <React.Fragment key={key}>{component({ state, dispatch })}</React.Fragment>;
                        }

                        // eslint-disable-next-line react/no-array-index-key
                        return <React.Fragment key={key} />;
                    })}
                </>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
});
