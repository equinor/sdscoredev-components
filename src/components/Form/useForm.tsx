import { set } from 'components/utils';
import React, { useState, useEffect, useContext, useRef} from 'react'
import { ValidationDispatchContext, ValidationStateContext } from './Validation/ValidationProvider';

export const useForm = (formData: any, props: any) => {
    const [formState, setFormState] = useState<any>({
        data: null,
        errors: {}
    });

    const state: any = useContext(ValidationStateContext);
    const dispatch: any = useContext(ValidationDispatchContext);
    const dirty = useRef(false);

    const submit = async () => {
        if (typeof props.onSubmit === 'function') {
            const { data: result, error } = await props.onSubmit(formState.data)

            if (!error && typeof props.onSuccess === 'function') {
                props.onSuccess(formState.data)
            } else {
                dispatch({type: 'SET_ERRORS', payload: error.response.data })
            }
        }
    }

    const cancel = () => {
        setFormState((state: any) => ({ ...state, data: formData }));
        dispatch({ type: 'SET_ERRORS', payload: undefined})
    }

    const update = (e: any) => {
        const { id, value, checked, type } = e.target;

        if (type === 'checkbox') {
            setFormState((state: any) => ({ ...state, data: { ...state.data, [id]: checked } }));
        } else {
            setFormState((state: any) => { 
                const data = {...state.data}
                set(data, id, value)
                return {...state, data}
            });
        }
    }

    useEffect(() => {
        if (!formData && !dirty.current) {
            if (typeof props.onRender === 'function') {
                const manipulatedData = props.onRender({})
                setFormState((state: any) => ({ ...state, data: manipulatedData }));
                dirty.current = true
            }
        }

        if (formState.data !== formData && !dirty.current) {
            if (typeof props.onRender === 'function') {
                const manipulatedData = props.onRender(formData)
                setFormState((state: any) => ({ ...state, data: manipulatedData }));
            } else {
                setFormState((state: any) => ({ ...state, data: formData }));
            }

            dirty.current = true
        }
    }, [formData]);

    /**
     * Run validation on the internal data if `onValidation` is defined in the Hook properties
     * 
     * @returns boolean
     */
    const valid = () => {
        if (typeof props.onValidate === 'function') {
            return props.onValidate(formState.data)
        }

        return true;
    }

    return { data: formState.data, submit, update, cancel, valid };
}
