import React from "react";
import {useNode} from "../../state/nodes/hooks/useNode";
import {Children} from "./Node/Children";
import {Content} from "./Node/Content";

export const Node = ({id}) => {
    const {isComplete} = useNode(id);

    return <li data-node-id={id} spellCheck={false} className={`node${isComplete ? ' isComplete' : ''}`}>
        <Content id={id} />
        <Children parentId={id} />
    </li>;
};