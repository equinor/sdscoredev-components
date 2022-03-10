import React, { useRef } from 'react';
import { Button, Tooltip, Typography } from '@equinor/eds-core-react';
import { Dialog, DialogRef } from '../../Dialog';
import { ExportProps } from '../Export';

export const Export: React.FC<ExportProps> = ({ title, icon }) => {
    const dialogRef = useRef<DialogRef>(null);

    return (
        <>
            <Tooltip title="Export data" placement="top">
                <Button variant="ghost" onClick={() => dialogRef?.current?.open()}>
                    {title}{icon}
                </Button>
            </Tooltip>
            
            <Dialog 
                title={title}
                width={800}
                primaryButton="Export"
                cancelButton="Close"
                noLoading={true}
                onPrimary={() => {}}
                ref={dialogRef}
            >
                <Typography variant="h6">NOT IMPLEMENTED YET</Typography>   
            </Dialog>
        </>
    )
}
