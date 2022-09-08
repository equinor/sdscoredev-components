import { ViewMode } from 'types';

export const SET_DATES = 'SET_DATES';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';

interface GanttState {
    dates?: Array<Date>;
    headerHeight?: number;
    viewMode?: ViewMode | null;
    viewModeTickWidth?: any;
}

export const initialState: GanttState = {
    dates: [],
    headerHeight: 50,
    viewMode: null,
    viewModeTickWidth: {
        128: 30,
        64: 40,
        32: 50,
        16: 60,
        8: 80,
        4: 100,
        2: 100,
        1: 100,
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
