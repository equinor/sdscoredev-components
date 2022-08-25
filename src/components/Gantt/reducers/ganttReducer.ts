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
        hour: 50,
        quarterday: 60,
        halfday: 100,
        day: 100,
        week: 120,
        month: 160,
        quarteryear: 160,
        halfyear: 160,
        year: 200,
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
