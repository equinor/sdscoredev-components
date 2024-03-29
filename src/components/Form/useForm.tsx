import React, { useState, useEffect, useContext, ReactFragment, useRef } from 'react';
import { set } from '../helpers';
import { ValidationDispatchContext } from './Validation/ValidationProvider';

type UseFormHook = {
    data: any;
    submit: any;
    update: Function;
    cancel: Function;
    reset: Function;
    valid: boolean;
};

type UseFormHookProps = {
    onSubmit?: (payload: any) => Promise<any> | void;
    onSuccess?: (result: any) => void;
    onValidate?: (payload: any) => boolean;
    onRender?: (formData: any) => any;
    onError?: (error: any) => void;
};

export const useForm = (formData: any, props: UseFormHookProps): UseFormHook | ReactFragment => {
    const [form, setForm] = useState<any>(null);
    const init = useRef(false);
    const hasError = useRef(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    const dispatch: any = useContext(ValidationDispatchContext);

    const promiseSubmit = async () => {
        if (typeof props.onSubmit === 'function') {
            const { data, error, status } = await props.onSubmit(form);
            if (status >= 200 && status < 300 && !error) {
                hasError.current = false;
                dispatch({ type: 'SET_ERRORS', payload: undefined });

                setHasChanged(false);

                if (typeof props.onSuccess === 'function') props.onSuccess(data);
            } else {
                hasError.current = true;
                dispatch({ type: 'SET_ERRORS', payload: error.response.data });

                if (typeof props.onError === 'function') {
                    props.onError(error.response.data);
                    setForm(form);
                }
            }
        }
    };

    const submit = () => {
        setSubmitting(true);
    };

    const cancel = () => {
        if (formData) {
            setForm(formData);
        } else {
            setForm({});
        }
        dispatch({ type: 'SET_ERRORS', payload: undefined });
    };

    const update = (e: any) => {
        const { id, value, checked, type } = e.target;

        if (form[id] !== value) {
            setHasChanged(true);
        }

        if (type === 'checkbox') {
            setForm((state: any) => ({ ...state, [id]: checked }));
        } else {
            setForm((state: any) => {
                const newData = { ...state };
                set(newData, id, value);
                return { ...state, ...newData };
            });
        }
    };

    useEffect(() => {
        if (!hasError.current) {
            if (formData && props.onRender) {
                const manipulatedValues = props.onRender(formData);
                setForm(manipulatedValues);
            } else if (formData && !props.onRender) {
                setForm(formData);
            } else {
                setForm({});
            }
        }
    }, [formData]);

    /**
     * Only run onRender one time, and only after form state is set
     */
    useEffect(() => {
        if (form && props.onRender && !init.current) {
            init.current = true;
            const manipulatedValues = props.onRender(form);
            setForm((state: any) => ({ ...state, ...manipulatedValues }));
        }
    }, [form]);

    useEffect(() => {
        if (submitting) {
            promiseSubmit();
            setSubmitting(false);
        }
    }, [submitting]);

    /**
     * Run validation on the internal data if `onValidation` is defined in the Hook properties
     *
     * @returns boolean
     */
    const valid = () => {
        if (typeof props.onValidate === 'function') {
            return props.onValidate(form);
        }

        return true;
    };

    const reset = () => {
        if (formData) {
            setForm(formData);
        } else {
            setForm({});
        }

        dispatch({ type: 'SET_ERRORS', payload: undefined });
    };

    if (!form) return <></>;

    return { data: form, submit, update, cancel, valid, reset, hasChanged };
};
