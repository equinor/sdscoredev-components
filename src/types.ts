import React from 'react';

export type GeneralStoreProps = {
    reducers: any;
    components: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
};

export type State = { [key: string]: any };

export type Reducer = {
    reducer: (state: State | undefined, action: Action) => State;
    initialState: State;
};

export type ReducerProp = {
    reducer?: { [key: string]: Reducer };
};

export type FC<P = {}> = React.FC<P> & ReducerProp;

export type Action = {
    type: any;
    payload?: any;
};

export enum ViewMode {
    Hour = 128,
    QuarterDay = 64,
    HalfDay = 32,
    Day = 16,
    Week = 8,
    Month = 4,
    QuarterYear = 2,
    HalfYear = 1,
    Year = 0,
}
