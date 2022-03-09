import React from "react";
import {useNode} from "../state/nodes/hooks/useNode";
import {Children} from "./Children";

export const Node = ({id}) => {
    const node = useNode(id);

    return <div>
        Here is the node with id {id}
        <Children parentId={id} />
    </div>;
};