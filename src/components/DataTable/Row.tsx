import React from 'react';

export type RowProps = {
    /**
     * Callback for when the row is clicked
     */
    onClick?: Function;
    /**
     * Callback for when the row is hovered
     */
    onHover?: Function;
    /**
     * Callback for providing an url to be set for the row. By adding this, every cell in the row wil be wrapped with an `<a>`
     */
    getLink?: (row: any) => string;
    /**
     * Callback to get style for the row
     */
    getStyle?: (row: any) => { [key: string]: any };
};

export const Row: React.FC<RowProps> = (props) => {
    return <React.Fragment {...props} />;
};
