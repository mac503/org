import React, {useEffect, useState} from "react";
import {useNode} from "../../../state/nodes/hooks/useNode";
import ContentEditable from "react-contenteditable";
import {useNodesDispatch} from "../../../state/nodes/hooks/useNodesDispatch";
import {
    CREATE_NODE,
    MOVE_NODE, ROOT_NODE,
    TOGGLE_NODE_IS_COMPLETE,
    UPDATE_NODE_CONTENT
} from "../../../state/nodes/reducers/nodesReducer";
import {UP, DOWN, CTRL, ENTER, SHIFT, TAB} from "../../../helpers/getActionCreatorFromKeyDown";
import {dispatchActionFromKeyDown} from "../../../helpers/dispatchActionFromKeyDown";
import {SELECT_NODE, MOVE_UP, MOVE_DOWN} from "../../../state/ui/reducers/selectedNodeReducer";
import {useUiDispatch} from "../../../state/ui/hooks/useUiDispatch";
import {v4 as uuid} from "uuid";
import {getNextVisibleNodeId, getPreviousVisibleNodeId} from "../../../helpers/getVisibleNodeIds";
import {useNodes} from "../../../state/nodes/hooks/useNodes";
import {useThrottle} from "../../../helpers/useThrottle";
import {useParentNode} from "../../../state/nodes/hooks/useParentNode";

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
        [CTRL + SHIFT]: {
            [ENTER]: ({id}) => ({
                type: TOGGLE_NODE_IS_COMPLETE,
                id,
            }),
        },
        [TAB]: ({id, nodes, flushContentRef}) => {
            flushContentRef.current();

            const previousVisibleNodeId = getPreviousVisibleNodeId(id);

            if (previousVisibleNodeId === id) {
                return {};
            }

            const [, parentNode] = Object.entries(nodes).find(([, node]) => node.children.includes(id));
            const siblings = parentNode.children;

            if (siblings.includes(previousVisibleNodeId)) {
                return {
                    type: MOVE_NODE,
                    id,
                    newParentId: previousVisibleNodeId,
                    newPreviousSiblingId: nodes[previousVisibleNodeId].children.length
                        ? nodes[previousVisibleNodeId].children[nodes[previousVisibleNodeId].children.length - 1]
                        : undefined,
                };
            }

            return {};
        },
        [SHIFT]: {
            [TAB]:  ({id, nodes, flushContentRef}) => {
                flushContentRef.current();

                const [parentNodeId] = Object.entries(nodes).find(([, node]) => node.children.includes(id));

                if (ROOT_NODE === parentNodeId) {
                    return {};
                }

                const [parentNodeOfParentNodeId] = Object.entries(nodes).find(([, node]) => node.children.includes(parentNodeId));

                return {
                    type: MOVE_NODE,
                    id,
                    newParentId: parentNodeOfParentNodeId,
                    newPreviousSiblingId: parentNodeId,
                };
            },
        }
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
    const isPreviousVisibleNodeASibling = ((useParentNode(id) || {}).children || []).includes(getPreviousVisibleNodeId(id));

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
    }, [children, isPreviousVisibleNodeASibling]);

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