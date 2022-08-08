import { DispatchContext } from 'components/DataTable/DataTableStore';
import React, { useContext } from 'react';

import { Button, Icon, Tooltip } from '@equinor/eds-core-react';

import { FilterProps } from './index';

export const Filter: React.FC<FilterProps> = ({ title, onClick }) => {
    return (
        <Tooltip title="Show filter" placement="top">
            <Button variant="ghost" onClick={onClick} data-cy="sdscc-DataTable-Button-filter">
                {title}
                <Icon name="filter_list" title="Show filter" size={24} />
            </Button>
        </Tooltip>
    );
};
