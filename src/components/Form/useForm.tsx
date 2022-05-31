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
    onRender?: (formData: any) => void;
    onError?: (error: any) => void;
    propagate?: boolean;
}

export const useForm = (formData: any, props: UseFormHookProps): UseFormHook | ReactFragment => {
    const [form, setForm] = useState<any>(null);
    const init = useRef(false);
    const hasError = useRef(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    const dispatch: any = useContext(ValidationDispatchContext);

    const propagateSubmit = () => {
        if (typeof props.onSubmit === 'function') props.onSubmit(form)
    }

    const promiseSubmit = async () => {
        if (typeof props.onSubmit === 'function') {
            const { data, error } = await props.onSubmit(form)

            if (data && !error && typeof props.onSuccess === 'function') {
                dispatch({type: 'SET_ERRORS', payload: undefined })
                hasError.current = false;
                setHasChanged(false)
                props.onSuccess(data.result)
            } else {
                hasError.current = true;
                dispatch({type: 'SET_ERRORS', payload: error.response.data })

                if (typeof props.onError === 'function') {
                    props.onError(error.response.data)
                }
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
        const { id, value, checked, type } = e.target;

        if(form[id] !== value) {
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
        if (!hasError.current) {
            if (formData) {
                setForm(formData);
            } else {
                setForm({});
            }
        }
    }, [formData])

    /**
     * Only run onRender one time, and only after form state is set
     */
    useEffect(() => {
        if (form && props.onRender && !init.current) {
            init.current = true
            props.onRender(form)
        }
    }, [form])

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
            return props.onValidate(form)
        }

        return true;
    }

    if (!form) return <></>

    return { data: form, submit, update, cancel, valid, hasChanged };
}
