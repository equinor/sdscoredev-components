import React, { useContext, useEffect } from 'react';
import { Button, Tooltip, Icon } from '@equinor/eds-core-react';
import { FilterProps } from '.';
import { DispatchContext } from 'components/DataTable/DataTableStore';

export const Filter: React.FC<FilterProps> = ({ title, onClick }) => {
    const dispatch: any = useContext(DispatchContext);

    return (
        <Tooltip title="Show filter" placement="top">
            <Button variant="ghost" onClick={onClick} data-cy="sdscc-DataTable-Button-filter">
                {title}
                <Icon name="filter_list" title="Show filter" size={24} />
            </Button>
        </Tooltip>
    );
};
