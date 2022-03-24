import React from "react";
declare type TableBodyProps = {
    data?: any;
    onFetch?: Function;
    children?: any;
    id?: string;
};
/**
 * TODO: Needs to be split in two separate Body components, One default, and one for the Tree plugin
 */
declare const Body: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
export default Body;
