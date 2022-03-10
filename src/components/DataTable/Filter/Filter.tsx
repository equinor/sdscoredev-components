import React from 'react';
import { Button, Tooltip, Icon } from '@equinor/eds-core-react';
import { FilterProps } from '../Filter';

export const Filter: React.FC<FilterProps> = ({ title, onClick }) => {
    return (
        <Tooltip title="Show filter" placement="top">
            <Button variant="ghost" onClick={onClick}>
            {title}<Icon name="filter_list" title="Show filter" size={24} />
            </Button>
        </Tooltip>

    )
}
