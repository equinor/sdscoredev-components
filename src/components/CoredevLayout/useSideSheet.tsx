import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

const useSideSheet = (sideSheet: ReactNode) => {
    const dispatch = useDispatch();

    const setSideSheetOpen = (val: boolean) => {
        if (val) dispatch({ type: 'SET_SIDE_SHEET', payload: sideSheet });
    };

    return { setSideSheetOpen };
};

export default useSideSheet;
