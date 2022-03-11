import React from "react";
import {useNode} from "../../state/nodes/hooks/useNode";
import {Children} from "./Node/Children";
import {Content} from "./Node/Content";

export const Node = ({id}) => {
    const node = useNode(id);

    return <div className={`node`}>
        <Content id={id} />
        <Children parentId={id} />
    </div>;
};