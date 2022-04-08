import { set } from 'components/utils';
import React, { useState, useEffect, useContext, useRef} from 'react'
import { Label as EdsLabel } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { ValidationDispatchContext, ValidationStateContext } from './ValidationProvider';

const ValidationError = styled(EdsLabel)`
    color: rgb(235, 0, 0);
`

type ValidationProps = {
    includes?: string;
}

export const useValidation = (subscriptionKey: string) => {
    const [validationErrors, setValidationErrors] = useState<Array<string> | undefined>(undefined)

    const state: any = useContext(ValidationStateContext);
    const dispatch: any = useContext(ValidationDispatchContext);
    const dirty = useRef(false);

    /**
         * If errors exist in the errorReducer, 
         * see if that error belongs to this input.
         * Before this component unloads, clear the errors
         */
     useEffect(() => {
        const values = state.validationReducer.errors?.errors;

        if (values) {
            Object.entries(values).forEach((item: [string, Array<string>], index: number) => {
                const [key, value] = item;

                if (key.toLowerCase() === subscriptionKey.toLowerCase()) {
                    setValidationErrors(value)
                }
            })
        } else {
            setValidationErrors(undefined)
        }
    }, [state.validationReducer.errors])

    const validation = (props: ValidationProps) => {
        const { includes = '' } = props;
        
        if (validationErrors) {
            return (
                <>
                    {validationErrors.filter((x) => x.includes(includes)).map((validationError: string, index) => (
                        <ValidationError key={index} label={validationError} />
                    ))}
                </>
            )
        }

        return <></>
    }

    return { validation };
}
