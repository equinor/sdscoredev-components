import { set } from 'components/utils';
import React, { useState, useEffect, useContext, ReactFragment, useRef} from 'react'
import { ValidationDispatchContext } from './Validation/ValidationProvider';

type UseFormHook = {
    data: any;
    submit: any;
    update: Function;
    cancel: Function;
    valid: boolean
}

type UseFormHookProps = {
    onSubmit?: (payload: any) => Promise<any> | void;
    onSuccess?: (result: any) => void;
    onValidate?: (payload: any) => boolean;
    propagate?: boolean;
}

export const useForm = (formData: any, props: UseFormHookProps): UseFormHook | ReactFragment => {
    const [data, setData] = useState<any>(null);
    const dirty = useRef(true);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const dispatch: any = useContext(ValidationDispatchContext);

    const propagateSubmit = () => {
        if (typeof props.onSubmit === 'function') props.onSubmit(data)
    }

    const promiseSubmit = async () => {
        if (typeof props.onSubmit === 'function') {
            const { data: result, error } = await props.onSubmit(data)

            if (!error && typeof props.onSuccess === 'function') {
                dispatch({type: 'SET_ERRORS', payload: undefined })
                props.onSuccess(result)
            } else {
                dispatch({type: 'SET_ERRORS', payload: error.response.data })
            }
        }
    }

    const submit = () => {
        setSubmitting(true);
    }

    const cancel = () => {
        setData((state: any) => ({ ...state, ...formData }));
        dispatch({ type: 'SET_ERRORS', payload: undefined})
    }

    const update = (e: any) => {
        dirty.current = true;
        const { id, value, checked, type } = e.target;

        if (type === 'checkbox') {
            setData((state: any) => ({ ...state, [id]: checked }));
        } else {
            setData((state: any) => { 
                const newData = {...state}
                set(newData, id, value)
                return {...state, ...newData}
            });
        }
    }

    useEffect(() => {
        if (!data && formData) {
            setData(formData);
            dirty.current = false;
        }

        if (formData && !dirty.current) {
            setData(formData);
        }
    }, [formData]);

    useEffect(() => {
        dirty.current = false;
    }, [data])

    useEffect(() => {
        
        if (!dirty.current && submitting) {
            if (props.propagate) {
                propagateSubmit()
            } else {
                promiseSubmit()
            }

            setSubmitting(false);
        }
    }, [dirty.current, submitting])

    /**
     * Run validation on the internal data if `onValidation` is defined in the Hook properties
     * 
     * @returns boolean
     */
    const valid = () => {
        if (typeof props.onValidate === 'function') {
            return props.onValidate(data)
        }

        return true;
    }

    if (!data) return <></>

    return { data, submit, update, cancel, valid };
}
