import React from "react";
import {useNode} from "../../../state/nodes/hooks/useNode";
import ContentEditable from "react-contenteditable";
import {useNodesDispatch} from "../../../state/nodes/hooks/useNodesDispatch";
import {TOGGLE_NODE_IS_COMPLETE, UPDATE_NODE_CONTENT} from "../../../state/nodes/reducers/nodesReducer";
import {UP, DOWN, CTRL, ENTER} from "../../../helpers/getActionCreatorFromKeyDown";
import {dispatchActionFromKeyDown} from "../../../helpers/dispatchActionFromKeyDown";
import {SELECT_NODE, MOVE_UP, MOVE_DOWN} from "../../../state/ui/reducers/selectedNodeReducer";
import {useUiDispatch} from "../../../state/ui/hooks/useUiDispatch";

const nodesKeyToActionMap = {
    [CTRL]: {
        [ENTER]: ({id}) => ({
            type: TOGGLE_NODE_IS_COMPLETE,
            id,
        }),
    },
};

const uiKeyToActionMap = {
    [UP]: () => ({
        type: MOVE_UP,
    }),
    [DOWN]: () => ({
        type: MOVE_DOWN,
    }),
};

export const Content = ({id}) => {
    const {content} = useNode(id);
    const nodesDispatch = useNodesDispatch();
    const uiDispatch = useUiDispatch();

    return <ContentEditable
        html={content ?? ``}
        className={'content'}
        onFocus={() => uiDispatch({
            type: SELECT_NODE,
            id,
        })}
        onChange={(e) => nodesDispatch({
            type: UPDATE_NODE_CONTENT,
            id,
            content: e.target.value,
        })}
        onKeyDown={dispatchActionFromKeyDown(
            [nodesKeyToActionMap, nodesDispatch, {id}],
            [uiKeyToActionMap, uiDispatch, {}],
        )}
        tagName={'span'}
    />;
};