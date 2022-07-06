export const SET_DATES = 'SET_DATES';

interface GanttState {
    dates?: Array<Date>;
}

export const initialState: GanttState = {
    dates: [],
};

const reducer = (state = initialState, action: any): GanttState => {
    switch (action.type) {
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
