import React, { useRef } from 'react';
import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { camelize } from '../helpers';

const Wrapper = styled.div`
    overflow-y: auto;
    display: grid;
    grid-template-rows: min-content auto;
    gap: 0;
`;

const Header = styled.div`
    display: grid;
    width: calc(100% - 96px);
    grid-template-columns: auto min-content;
    padding: 16px 0 16px 16px;
    align-items: center;
    background: #ffffff;
    position: absolute;
    top: 0;
`;

const Content = styled.div`
    padding: 16px;
    overflow-x: auto;
    border-top: 1px solid rgba(247, 247, 247, 1);
    height: 85vh;
`;

export type SidesheetProps = {
    /**
     * Sidesheet title
     */
    title: string;
    headerContent?: any;
};

export const Sidesheet: React.FC<SidesheetProps> = (props: any) => {
    const { children, title, headerContent } = props;
    const ref = useRef<any>(null);

    return (
        <Wrapper ref={ref}>
            <Header data-cy={`Sidesheet-${camelize(title)}-header`}>
                <Typography variant="h4" style={{ lineHeight: '48px', fontWeight: 500 }}>
                    {title}
                </Typography>
                {headerContent}
            </Header>

            <Content data-cy={`Sidesheet-${camelize(title)}-content`}>{children}</Content>
        </Wrapper>
    );
};
