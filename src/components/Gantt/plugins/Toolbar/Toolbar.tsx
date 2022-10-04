import React, { ReactChild, ReactFragment, ReactPortal, useEffect, useRef } from 'react';
import { ToolbarProps } from '.';

export type InternalToolbarProps = {
    id: string;
    components?: (ReactChild | ReactFragment | ReactPortal)[];
} & ToolbarProps;

export const Toolbar: React.FC<InternalToolbarProps> = (props) => {
    const { children, id, components, placement } = props;
    const toolbarRef = useRef<any>(null);

    useEffect(() => {
        document.getElementsByClassName('top-right')[0].append(toolbarRef.current);
    }, [children]);

    return (
        <div id={id}>
            <div ref={toolbarRef} style={{ float: 'right' }}>
                {children}
                {components?.map((component: any, index: number) => {
                    const key = `lt-Index: ${index}`;
                    return <React.Fragment key={key}>{component.props.children}</React.Fragment>;
                })}
            </div>
        </div>
    );
};
