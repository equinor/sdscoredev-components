import { DispatchContext } from 'components/DataTable/DataTableStore';
import React, { useContext } from 'react';

import { Button, Icon, Tooltip } from '@equinor/eds-core-react';

import { useLocation } from 'react-router-dom';
import { FilterProps } from './index';

export const Filter: React.FC<FilterProps> = ({ title, onClick, hideButton }) => {
    const location = useLocation();
    return (
        <>
            {!hideButton && (
                <Tooltip title="Show filter" placement="top">
                    <Button variant="ghost" onClick={onClick} data-cy="sdscc-DataTable-Button-filter">
                        {title}
                        <Icon name="filter_list" title="Show filter" size={24} />
                        {new URLSearchParams(location?.search) &&
                            new URLSearchParams(location?.search)?.get('filter') &&
                            new URLSearchParams(location?.search)?.get('filter') !== undefined &&
                            new URLSearchParams(location?.search)?.get('filter') !== '' && (
                                <Icon name="star_filled" title="Filter active" color="#e4502b" />
                            )}
                    </Button>
                </Tooltip>
            )}
        </>
    );
};
