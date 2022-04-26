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
    const [form, setForm] = useState<any>(undefined);
    const data = useRef(undefined);
    const dirty = useRef(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    const dispatch: any = useContext(ValidationDispatchContext);

    const propagateSubmit = () => {
        if (typeof props.onSubmit === 'function') props.onSubmit(form)
    }

    const promiseSubmit = async () => {
        if (typeof props.onSubmit === 'function') {
            const { data: result, error } = await props.onSubmit(form)

            if (!error && typeof props.onSuccess === 'function') {
                dispatch({type: 'SET_ERRORS', payload: undefined })
                setHasChanged(false)
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
        setForm((state: any) => ({ ...state, ...formData }));
        dispatch({ type: 'SET_ERRORS', payload: undefined})
    }

    const update = (e: any) => {
        dirty.current = true;
        const { id, value, checked, type } = e.target;

        if(data[id] !== value) {
            setHasChanged(true);
        }

        if (type === 'checkbox') {
            setForm((state: any) => ({ ...state, [id]: checked }));
        } else {
            setForm((state: any) => { 
                const newData = {...state}
                set(newData, id, value)
                return {...state, ...newData}
            });
        }
    }

    useEffect(() => {
        if (data.current) {
            setForm(data.current);
        }
    }, [data.current])

    useEffect(() => {
        if (submitting) {
            if (props.propagate) {
                propagateSubmit()
            } else {
                promiseSubmit()
            }

            setSubmitting(false);
        }
    }, [submitting])

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

    data.current = formData

    if (!data.current) return <></>

    return { data: form || data.current, submit, update, cancel, valid, hasChanged };
}
