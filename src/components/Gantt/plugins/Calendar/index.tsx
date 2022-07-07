import React from 'react';
import { ReducerProp } from 'types';
// import { gridReducer } from './gridReducer';

export type CalendarProps = {};

const Calendar: React.FC<CalendarProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Calendar</React.Fragment>;
};

// Grid.reducer = { gridReducer };

export { Calendar };
