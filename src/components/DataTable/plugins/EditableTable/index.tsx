import { FC } from '../../types';
import React, { Ref } from 'react';
import { editableTableReducer } from './editableTableReducer';

export type EditableTableProps = {
    /**
     * Set when edit icon is clicked
     */
    editRowIndex?: number;
    /**
     * Called when save icon is clicked
     */
    onSave?: Function;
};

const EditableTable: FC<EditableTableProps> = (props) => {
    return (<React.Fragment {...props}>EditableTable</React.Fragment>)
}

EditableTable.reducer = { editableTableReducer }

export { EditableTable }
