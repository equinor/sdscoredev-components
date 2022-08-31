import { ViewMode } from '../types/public-types';

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
        hour: 30,
        quarterday: 40,
        halfday: 50,
        day: 60,
        week: 80,
        month: 100,
        quarteryear: 100,
        halfyear: 100,
        year: 100,
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
