import { ViewMode } from 'types';

export const SET_DATES = 'SET_DATES';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';
export const SET_READONLY = 'SET_READONLY';

interface GanttState {
    dates?: Array<Date>;
    headerHeight?: number;
    viewMode?: ViewMode | null;
    viewModeTickWidth?: any;
}

export const initialState: GanttState = {
    dates: [],
    headerHeight: 48,
    viewMode: null,
    viewModeTickWidth: {
        128: 30,
        64: 30,
        32: 30,
        16: 30,
        8: 70,
        4: 80,
        2: 80,
        1: 80,
        0: 100,
    },
};

const reducer = (state = initialState, action: any): GanttState => {
    switch (action.type) {
        case SET_DATES:
            return {
                ...state,
                dates: action.payload,
            };
        case SET_VIEW_MODE:
            return {
                ...state,
                viewMode: action.payload,
            };
        default:
            return state;
    }
};

export const ganttReducer = { reducer, initialState };
