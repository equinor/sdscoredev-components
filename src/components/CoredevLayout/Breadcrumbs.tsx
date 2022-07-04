import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumbs as EDSBreadcrumbs } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { LayoutProps } from './Layout';
import { StateContext } from './LayoutStore';

export type BreadcrumbsProps = {
    /**
     * Contains an object where key is an item in the route path and
     * the value is either a boolean indicating if the route path item should be hidden or
     * a callback to render a custom component.
     *
     * e.g.
     * ```
     * {
     *      home: false,
     *      articleId: (props) => <ArticleSelect {...props} />
     * }
     * ```
     *
     * Here articleId is probably a param in the route path, like `:articleId`
     */
    items?: { [key: string]: boolean | Function | 'link' };
};

// TODO: Implement custom rendering of indiuvidual breadcrumb
export const Breadcrumbs: React.FC<LayoutProps & BreadcrumbsProps> = (props) => {
    const { items } = props;
    const [paths, setPaths] = useState<any>([]);
    const state: any = useContext(StateContext);
    const { params, path } = state;

    const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

    const getLink = (paths: Array<string>, item: string) => {
        /* Make sure we don't mutate paths */
        const values = [...paths];

        return values.reduce((prev, current, i, array) => {
            /* Exit early if we reached the item, because we don't want the last item 
            in the breadcrumb to be a link to itself */
            if (current === item) array.splice(1);

            /* If the item starts with `:` we know it is a param, so then we fetch the value */
            if (current.startsWith(':')) {
                const key = current.replace(':', '');
                // eslint-disable-next-line no-param-reassign
                current = params[key];
            }

            return [prev, current].join('/');
        });
    };

    useEffect(() => {
        if (path) {
            const components: Array<any> = [];
            const paths = path.split('/');
            /* Iterate items in the path */
            paths
                .filter((x: string) => x)
                .forEach((item: string, index: number) => {
                    const key = item.replace(':', '').toString();

                    // Exit early
                    if (typeof items === 'undefined') return;

                    // Make item callable in case it is a function
                    const callable = items[key];

                    /* If item is a function */
                    if (typeof callable === 'function') {
                        components.push(<React.Fragment key={item}>{callable(props)}</React.Fragment>);

                        /* If key exist in items and it is a 'link' */
                    } else if (items[key] && items[key] === 'link' && index < paths.length - 2) {
                        components.push(
                            <React.Fragment key={item}>
                                <Link to={getLink(paths, item)}>{capitalizeFirstLetter(params[key] || item)}</Link>
                            </React.Fragment>,
                        );

                        /* Else render default */
                    } else {
                        components.push(
                            <React.Fragment key={item}>{capitalizeFirstLetter(params[key] || item)}</React.Fragment>,
                        );
                    }
                });

            setPaths(components);
        }
    }, [state.path]);

    if (!paths.length) return <></>;

    return <EDSBreadcrumbs>{paths}</EDSBreadcrumbs>;
};
