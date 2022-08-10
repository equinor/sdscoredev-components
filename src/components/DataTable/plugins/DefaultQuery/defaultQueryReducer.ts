import { DefaultQuery } from './DefaultQuery';

interface DefaultQueryState {}

export const initialState: DefaultQueryState = {};

const reducer = (state = initialState, action: any): DefaultQueryState => {
    switch (action.type) {
        default:
            return state;
    }
};

const component = DefaultQuery;

export const defaultQueryReducer = { reducer, initialState, component };
