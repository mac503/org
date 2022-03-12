import React, {useEffect} from "react";
import {ROOT_NODE} from "../../state/nodes/reducers/nodesReducer";
import {Children} from "./Node/Children";
import {useSelectedNode} from "../../state/ui/hooks/useSelectedNode";

export const RootNode = () => {
    const selectedNodeId = useSelectedNode();

    useEffect(() => {
        document.querySelector(`.node[data-node-id="${selectedNodeId}"] > .content`).focus();
    }, [selectedNodeId]);

    return <div className="node">
        <Children parentId={ROOT_NODE} />
    </div>;
};