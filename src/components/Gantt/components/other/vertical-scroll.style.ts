import styled from 'styled-components';

export const Scroll = styled.div`
    overflow: hidden auto;
    width: 17px;
    flex-shrink: 0;
    /*firefox*/
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 1.1rem;
        height: 1.1rem;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border: 6px solid transparent;
        background: rgba(0, 0, 0, 0.2);
        background: var(--palette-black-alpha-20, rgba(0, 0, 0, 0.2));
        border-radius: 10px;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-thumb:hover {
        border: 4px solid transparent;
        background: rgba(0, 0, 0, 0.3);
        background: var(--palette-black-alpha-30, rgba(0, 0, 0, 0.3));
        background-clip: padding-box;
    }
`;
