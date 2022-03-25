import React from 'react';

export const ReadOnly = (props: any) => {
    const { render, value, childKey } = props;

    if (render) {
        return <>{render({ options: value, getTagProps: () => {}, childKey })}</>;
    }

    if (typeof value === 'object' && childKey) {
        return <>{value[childKey]}</>;
    }

    return <>{value}</>;
};
