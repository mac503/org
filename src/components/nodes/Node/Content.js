import React from "react";
import {useNode} from "../../../state/nodes/hooks/useNode";
import ContentEditable from "react-contenteditable";
import {useNodesDispatch} from "../../../state/nodes/hooks/useNodesDispatch";
import {UPDATE_NODE_CONTENT} from "../../../state/nodes/reducers/nodesReducer";

export const Content = ({id}) => {
    const {content} = useNode(id);
    const nodesDispatch = useNodesDispatch();

    return <ContentEditable
        html={content ?? ``}
        className={'content'}
        onChange={(e) => nodesDispatch({
            type: UPDATE_NODE_CONTENT,
            id,
            content: e.target.value,
        })}
        tagName={'span'}
    />;
};
