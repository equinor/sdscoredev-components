export const SET_TASKS = 'SET_TASKS';

interface GanttState {
    tasks?: Array<any>;
}

export const initialState: GanttState = {
    tasks: [],
};

const reducer = (state = initialState, action: any): GanttState => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};

export const ganttReducer = { reducer, initialState };
