import React, { useState, useEffect} from 'react'

export const useForm = (defaultData: any, props: any) => {
    const [data, setData] = useState<any>(null);

    const submit = () => {
        if (typeof props.onSubmit === 'function') {
            const response = props.onSubmit(data)

            if (!response.error && typeof props.onSuccess === 'function') {
                props.onSuccess(response.data)
                setData(null)
            }
        }
    }

    const cancel = () => {
        setData(defaultData);
    }

    const update = (e: any) => {
        const { id, value, checked, type } = e.target;

        if (type === 'checkbox') {
            setData((state: any) => ({ ...state, [id]: checked }));
        } else {
            setData((state: any) => ({ ...state, [id]: value }));
        }
    }

    useEffect(() => {
        if (!defaultData) {
            if (typeof props.onRender === 'function') {
                const manipulatedData = props.onRender({})
                setData(manipulatedData)
            }
        }

        if (data !== defaultData) {
            if (typeof props.onRender === 'function') {
                const manipulatedData = props.onRender(defaultData)
                setData(manipulatedData)
            } else {
                setData(defaultData)
            }
        }
    }, [defaultData]);

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

    return { data: data || {}, submit, update, cancel, valid };
}
