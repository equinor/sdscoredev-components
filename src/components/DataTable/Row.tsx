import React from 'react';

export type RowProps = {
    /**
     * Callback for when the row is clicked
     */
    onClick?: Function;
    /**
     * Callback for providing an url to be set for the row. By adding this, every cell in the row wil be wrapped with an `<a>`
     */
    getLink?: (row: any) => string;
}

export const Row: React.FC<RowProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
