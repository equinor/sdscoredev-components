import React, { useState, useEffect} from 'react'

export const useForm = (defaultData: any, props: any) => {
    const [data, setData] = useState<any>(null);

    const submit = () => {
        if (typeof props.onSubmit === 'function') props.onSubmit(data)
    }

    const cancel = () => {
        setData(defaultData);
    }

    const update = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((state: any) => ({ ...state, [id]: value }));
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
