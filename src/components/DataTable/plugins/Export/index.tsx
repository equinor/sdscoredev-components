import React from 'react';

import { FC } from '../../types';

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

const Export: FC<ExportProps> = (props) => {
    return <React.Fragment {...props}>Export</React.Fragment>;
};

export { Export };
