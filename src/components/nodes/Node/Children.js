import React from "react";
import {Node} from "../Node";
import {useNode} from "../../../state/nodes/hooks/useNode";

export const Children = ({parentId}) => {
    const node = useNode(parentId);
    const {children} = node;

    return <ul className={"children"}>
        {
            children && children.map((id) =>
                <li key={id}>
                    <Node id={id} />
                </li>
            )
        }
    </ul>
};