import React from "react";
import {useNode} from "../../../state/nodes/hooks/useNode";
import ContentEditable from "react-contenteditable";
import {useNodesDispatch} from "../../../state/nodes/hooks/useNodesDispatch";
import {TOGGLE_NODE_IS_COMPLETE, UPDATE_NODE_CONTENT} from "../../../state/nodes/reducers/nodesReducer";
import {CTRL, ENTER} from "../../../helpers/getActionCreatorFromKeyDown";
import {dispatchActionFromKeyDown} from "../../../helpers/dispatchActionFromKeyDown";

const nodesKeyToActionMap = {
    [CTRL]: {
        [ENTER]: ({id}) => ({
            type: TOGGLE_NODE_IS_COMPLETE,
            id,
        }),
    },
};

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
        onKeyDown={dispatchActionFromKeyDown([nodesKeyToActionMap, nodesDispatch, {id}])}
        tagName={'span'}
    />;
};