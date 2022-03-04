import React from 'react';

export type ColumnSelectorProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * The trigger button icon
     */
    icon?: JSX.Element;
};

export const ColumnSelector: React.FC<ColumnSelectorProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
