import React, { Children, cloneElement, forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { formReducer } from "./reducers/formReducer";
import { FormStore } from './FormStore';
import { FormWrapper } from './FormWrapper';

type Object = { [key: string]: any };

const ColumnsWrapper = styled.div<{count: number}>`
    display: grid;
    grid-template-rows: ${(props: any) => Array(props.count + 1).join('max-content ')};
    grid-row-gap: 30px;
    width: 100%;
`

export type FormProps = {
    children: any;
    onSubmit?: Function;
    onRender?: Function;
    onValidate?: Function;
    data?: any;
    reducers?: any;
};

export type FormRef = {} | null;

/**
 * Provides a container to add rows to. The rows will contain input components, 
 * and this component make sure the rows are dynamically created as a grid.
 * 
 * @param props 
 * @returns 
 */
 export const Form = forwardRef<FormRef, FormProps>((props: FormProps, ref) => {
    const { reducers } = props;
    // Peek the children so we can count and manipulate them
    const children = Children.toArray(props.children);

    return (
        <FormStore reducers={{ formReducer, ...reducers}}>
            <ColumnsWrapper count={children.length}>
                <FormWrapper {...props}>
                    {props.children}
                </FormWrapper>
            </ColumnsWrapper>
        </FormStore>
    )

});
