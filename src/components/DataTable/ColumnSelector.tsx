import React, { Ref } from 'react';

export type ColumnSelectorProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * The trigger button icon
     */
    icon?: JSX.Element;
    /**
     * A ref to this element
     */
    ref: Ref<any>;
};

export const ColumnSelector: React.FC<ColumnSelectorProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
