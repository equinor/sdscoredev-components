import React, { Ref } from 'react';

export type ColumnSelectorRef = {
    /**
     * Sets a column to be visible / hidden
     * @param column string
     * @param visible boolean
     */
    setColumn: (column: string, visible: boolean) => void;
} | null;

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
    ref?: Ref<ColumnSelectorRef>;
};

export const ColumnSelector: React.FC<ColumnSelectorProps> = (props) => {
    return (<React.Fragment {...props}>ColumnSelector</React.Fragment>)
}
