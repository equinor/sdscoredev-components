import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ rightPadding?: number }>`
    padding-left: 8px;
    padding-right: ${(props) => props.rightPadding ? `${props.rightPadding}px` : '0' };
    min-height: 38px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.025em;
`;

const HtmlWrapper = styled.div<{ rightPadding?: number }>`
    padding-left: 8px;
    padding-right: ${(props) => props.rightPadding ? `${props.rightPadding}px` : '0' };
    min-height: 38px;
    display: inline-block;
    align-content: center;
    letter-spacing: 0.025em;
`;

export const ReadOnlyValue = (props: any) => {
    const { render, value, childKey, options, variant, rightPadding, id } = props;
    const html = useRef(null);

    const getValueFromOptions = () => {
        const found = options.find((x: any) => x.id === value)
        if (found) return found[childKey || 'name']
        return ''
    }

    /**
     * Returns all textNodes inside a DOM element
     * 
     * @param node 
     * @param includeWhitespaceNodes 
     * @returns 
     */
    const getTextNodesIn = (node: any, includeWhitespaceNodes: boolean = false) => {
        var textNodes: Array<any> = [], whitespace = /^\s*$/;
    
        function getTextNodes(node: any) {
            if (node.nodeType === 3) {
                if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
                    textNodes.push(node);
                }
            } else {
                for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }
    
        getTextNodes(node);
        return textNodes;
    }

    /**
     * Wrap all textNodes with a `<p>` that are not wrapped. 
     * Because this is what tinymce editor do apparently.
     */
    useEffect(() => {
        if (html.current) {
            const parent = html.current;

            let textnodes = getTextNodesIn(parent)

            textnodes.forEach(node => {
                if (node.parentNode === parent) {
                    const span = document.createElement('p');
                    node.after(span);
                    span.appendChild(node);
                }
              });
        }
    }, [html.current])

    if (render) {
        return <Wrapper rightPadding={rightPadding}>{render({ value, getTagProps: undefined, childKey })}</Wrapper>;
    }

    if (variant === 'html') {
        return <HtmlWrapper ref={html} rightPadding={rightPadding} dangerouslySetInnerHTML={{ __html: value || '' }} />
    }
    
    if (typeof value === 'object' && value !== null) {
        return <Wrapper rightPadding={rightPadding}>{childKey && value[childKey] ? value[childKey] : value}</Wrapper>;
    }

    if (typeof value === 'number' && options) {
        return <Wrapper rightPadding={rightPadding}>{getValueFromOptions()}</Wrapper>;
    }

    return <Wrapper rightPadding={rightPadding}>{value}</Wrapper>;
};
