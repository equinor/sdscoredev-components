import { ODataQuery } from '.';

interface ODataQueryState {}

export const initialState: ODataQueryState = {};

const reducer = (state = initialState, action: any): ODataQueryState => {
    switch (action.type) {
        default:
            return state;
    }
};

const component = ODataQuery;

export const oDataQueryReducer = {reducer, initialState, component}
