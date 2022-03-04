import React, { createContext, useEffect, useReducer, useRef } from 'react';
import { Container } from './Form';

interface IFormContext {
    data: any;
    width: number;
    setData?: Function;
    setWidth?: Function;
    handleSubmit?: React.MouseEventHandler<HTMLButtonElement>;
};

type FormProps<T> = {
    children: any;
    cancelEl?: any;
    submitEl?: any;
    onSubmit?: Function;
    defaultData: Object | null;
    onChange?: Function;
    width?: number;
};

const initialState = {
    data: undefined,
    width: 900
}

export const FormContext = createContext<IFormContext>(initialState);

const SET_DATA = 'SET_DATA';
const SET_WIDTH = 'SET_WIDTH';

const FormReducer = (state, action) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, data: action.payload };
        case SET_WIDTH:
            return { ...state, width: action.payload };
        default:
            return state;
    }
}

// TODO: Make generic
const Form = <T extends Object>({ children, cancelEl, submitEl, onSubmit, onChange, defaultData, width, ...props }: FormProps<T>) => {
    const [state, dispatch] = useReducer(FormReducer, initialState);

    const setData = (payload) => {
        dispatch({
            type: SET_DATA,
            payload
        })
    }

    const setWidth = (payload) => {
        dispatch({
            type: SET_WIDTH,
            payload
        })
    }

    /**
     * Sets the form data to the initial data
     */
    const handleCancel = () => {
        setData(defaultData)
    }

    /**
     * If callback onSubmit is defined, submit data
     */
    const handleSubmit = () => {
        // if (typeof onSubmit === 'function') onSubmit(state.data)
    }

    /**
     * Register events, set `state.data` as dependency, because when state is updated the event handler
     * refers to the stale state value, same value as when the eventListener was defined in the first place.
     */
    // useEffect(() => {
    //     cancelEl && cancelEl.addEventListener('click', handleCancel)
    //     submitEl && submitEl.addEventListener('click', () => handleSubmit(state.data), true)


    //     return () => {
    //         cancelEl && cancelEl.removeEventListener('click', handleCancel)
    //         submitEl && submitEl.removeEventListener('click', () => handleSubmit(state.data), true)
    //     }
    
    // }, [state.data])

    /**
     * Only set initial data once
     */
    useEffect(() => {
        if (!state.data) setData(defaultData)
    }, [defaultData])

    if (!state.data) return <></>

    return (
        <FormContext.Provider value={{
            setData,
            setWidth,
            handleSubmit,
            data: state.data,
            width: state.width,
        }}>
            {children}
        </FormContext.Provider>
    );
}

export default Form;
export { Row } from './Row';
