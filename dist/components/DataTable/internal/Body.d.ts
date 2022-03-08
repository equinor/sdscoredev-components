import React from "react";
declare type TableBodyProps = {
    data?: any;
    onFetch?: Function;
    children?: any;
    id?: string;
};
declare const Body: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
export default Body;
