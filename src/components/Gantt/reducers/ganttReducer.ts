export const SET_TASKS = 'SET_TASKS';
export const SET_DATES = 'SET_DATES';

interface GanttState {
    tasks?: Array<any>;
    dates?: Array<Date>;
}

export const initialState: GanttState = {
    tasks: [],
    dates: [],
};

const reducer = (state = initialState, action: any): GanttState => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        case SET_DATES:
            return {
                ...state,
                dates: action.payload,
            };
        default:
            return state;
    }
};

export const ganttReducer = { reducer, initialState };
