import React, { ReactChild, ReactFragment, ReactPortal, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ToolbarProps, ToolbarRef } from '.';

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 12px;
    align-items: center;
    padding-bottom: 16px;
`;

const Left = styled.div`
    justify-content: left;
    width: 100%;
    display: inline-flex;
    align-items: center;
`;

const Right = styled.div`
    justify-content: right;
    width: 100%;
    display: inline-flex;
    align-items: center;
`;

const RightInner = styled.div`
    padding-left: 16px;
`;

export type InternalToolbarProps = {
    components?: (ReactChild | ReactFragment | ReactPortal)[];
} & ToolbarProps;

export const Toolbar = (props: InternalToolbarProps) => {
    const { children, components, id } = props;
    const toolbarRef = useRef<any>(null);

    // if (!components?.length && !children) return <></>;

    // TODO: Add default toolbar, just like DataTable

    useEffect(() => {
        document.getElementsByClassName('top-right')[0].append(toolbarRef.current);
    }, [children]);

    return (
        <div id={id}>
            <div ref={toolbarRef} style={{ float: 'right' }}>
                {children}
            </div>
        </div>
    );
};
