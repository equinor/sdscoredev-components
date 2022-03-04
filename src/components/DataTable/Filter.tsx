import React, { MouseEventHandler } from 'react';

export type FilterProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * Callback for when click the trigger button
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Filter: React.FC<FilterProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
