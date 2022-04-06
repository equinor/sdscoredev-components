import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ rightPadding?: number }>`
    padding-left: 8px;
    padding-right: ${(props) => props.rightPadding ? `${props.rightPadding}px` : '0' };
    min-height: 37px;
    display: grid;
    align-content: center;
    letter-spacing: 0.025em;
`;

export const ReadOnly = (props: any) => {
    const { render, value, childKey, options, variant, rightPadding, id } = props;

    const getValueFromOptions = () => {
        const found = options.find((x: any) => x.id === value)
        if (found) return found[childKey || 'name']
        return ''
    }

    if (render) {
        return <Wrapper rightPadding={rightPadding}>{render(value)}</Wrapper>;
    }

    if (variant === 'html') {
        return <Wrapper rightPadding={rightPadding} dangerouslySetInnerHTML={{ __html: value || '' }} />
    }
    
    if (typeof value === 'object' && value !== null) {
        return <Wrapper rightPadding={rightPadding}>{childKey && value[childKey] ? value[childKey] : value}</Wrapper>;
    }

    if (typeof value === 'number' && options) {
        return <Wrapper rightPadding={rightPadding}>{getValueFromOptions()}</Wrapper>;
    }

    return <Wrapper rightPadding={rightPadding}>{value}</Wrapper>;
};
