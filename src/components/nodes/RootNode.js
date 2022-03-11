import React from "react";
import {ROOT_NODE} from "../../state/nodes/reducers/nodesReducer";
import {Children} from "./Node/Children";

export const RootNode = () => {
    return <div className="node">
        <Children parentId={ROOT_NODE} />
    </div>;
};