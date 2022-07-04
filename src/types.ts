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
