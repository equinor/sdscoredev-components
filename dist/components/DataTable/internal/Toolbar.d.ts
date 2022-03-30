import React, { ReactChild, ReactFragment, ReactPortal } from "react";
export declare type ToolbarProps = {
    components?: (ReactChild | ReactFragment | ReactPortal)[];
};
declare const Toolbar: React.FC<ToolbarProps>;
export default Toolbar;
