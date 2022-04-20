import { set } from 'components/utils';
import React, { useState, useEffect, useContext, ReactFragment} from 'react'
import { ValidationDispatchContext, ValidationStateContext } from './Validation/ValidationProvider';

type UseFormHook = {
    data: any;
    submit: any;
    update: Function;
    cancel: Function;
    valid: boolean
}
export const useForm = (formData: any, props: any): UseFormHook | ReactFragment => {
    const [data, setData] = useState<any>(null);

    const state: any = useContext(ValidationStateContext);
    const dispatch: any = useContext(ValidationDispatchContext);

    const submit = async () => {
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

    const cancel = () => {
        setData((state: any) => ({ ...state, ...formData }));
        dispatch({ type: 'SET_ERRORS', payload: undefined})
    }

    const update = (e: any) => {
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
        }
    }, [formData]);

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
