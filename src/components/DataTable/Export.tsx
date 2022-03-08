import React from 'react';

export type ExportProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * The trigger button icon
     */
    icon?: JSX.Element;
};

export const Export: React.FC<ExportProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
