import React, {useEffect, useState} from "react";
import {useNode} from "../../../state/nodes/hooks/useNode";
import ContentEditable from "react-contenteditable";
import {useNodesDispatch} from "../../../state/nodes/hooks/useNodesDispatch";
import {CREATE_NODE, TOGGLE_NODE_IS_COMPLETE, UPDATE_NODE_CONTENT} from "../../../state/nodes/reducers/nodesReducer";
import {UP, DOWN, CTRL, ENTER} from "../../../helpers/getActionCreatorFromKeyDown";
import {dispatchActionFromKeyDown} from "../../../helpers/dispatchActionFromKeyDown";
import {SELECT_NODE, MOVE_UP, MOVE_DOWN} from "../../../state/ui/reducers/selectedNodeReducer";
import {useUiDispatch} from "../../../state/ui/hooks/useUiDispatch";
import {v4 as uuid} from "uuid";
import {getNextVisibleNodeId} from "../../../helpers/getVisibleNodeIds";
import {useNodes} from "../../../state/nodes/hooks/useNodes";
import {useThrottle} from "../../../helpers/useThrottle";

const useNodesKeyToActionMap = () => {
    const uiDispatch = useUiDispatch();

    return {
        [ENTER]: ({id, nodes, flushContentRef}) => {
            flushContentRef.current();

            let newId;

            do {
                newId = uuid();
            } while (newId in Object.keys(nodes))

            const node = nodes[id];
            const [parentId] = Object.entries(nodes).find(([, node]) => node.children.includes(id));
            const nextVisibleNodeId = getNextVisibleNodeId(id);

            const createAsChild = nextVisibleNodeId === node.children[0];

            uiDispatch({
                type: SELECT_NODE,
                id: newId,
            });

            return {
                type: CREATE_NODE,
                newId,
                parentId: createAsChild
                    ? id
                    : parentId,
                previousSiblingId: createAsChild
                    ? null
                    : id,
            };

        },
            [CTRL]: {
            [ENTER]: ({id}) => ({
                type: TOGGLE_NODE_IS_COMPLETE,
                id,
            }),
        },
    };
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
    const {content, children} = useNode(id);
    const nodesDispatch = useNodesDispatch();
    const uiDispatch = useUiDispatch();
    const nodes = useNodes();
    const nodesKeyToActionMap = useNodesKeyToActionMap();

    const [throttledUpdateContent, flushContentRef] = useThrottle(
        (e) => {
            nodesDispatch({
                type: UPDATE_NODE_CONTENT,
                id,
                content: e.target.value,
            })
        },
        400
    );

    // Use this hack to force ContentEditable to rerender when the children of the current node change, to force it to pick up the new value of `nodesKeyToActionMap`
    const [placeholder, setPlaceholder] = useState(true);
    useEffect(() => {
        setPlaceholder(placeholder => !placeholder);
    }, [children]);

    return <ContentEditable
        placeholder={String(placeholder)}
        html={content ?? ``}
        className={'content'}
        onFocus={() => uiDispatch({
            type: SELECT_NODE,
            id,
        })}
        onChange={(e) => throttledUpdateContent(e)}
        onKeyDown={dispatchActionFromKeyDown(
            [nodesKeyToActionMap, nodesDispatch, {id, nodes, flushContentRef}],
            [uiKeyToActionMap, uiDispatch, {}],
        )}
        tagName={'span'}
    />;
};