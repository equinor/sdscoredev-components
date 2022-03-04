import { DefaultQuery } from ".";

export const SET_QUERY = "SET_QUERY";

interface DefaultQueryState {
    query: any;
}

export const initialState: DefaultQueryState = {
  query: {},
};

const reducer = (state = initialState, action: any): DefaultQueryState => {
  switch (action.type) {


    default:
      return state;
  }
};

const component = DefaultQuery;

export const defaultQueryReducer = {reducer, initialState, component}
