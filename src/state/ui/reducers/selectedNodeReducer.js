import {createReducer} from "../../../helpers/createReducer";

export const SELECT_NODE = 'SELECT_NODE';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';

const getVisibleNodeIds = () => [...document.querySelectorAll('.node[data-node-id]')].map(nodeElement => nodeElement.dataset.nodeId);

// TODO remove
const NODE_1 = 'node1';

export const selectedNodeReducer = createReducer(NODE_1, {
    [SELECT_NODE]: ({}, {id}) => id,
    [MOVE_UP]: (currentlySelectedNodeId) => {
        const visibleNodeIds = getVisibleNodeIds();
        const indexOfCurrentlySelectedNode = visibleNodeIds.indexOf(currentlySelectedNodeId);

        return visibleNodeIds[Math.max(indexOfCurrentlySelectedNode - 1, 0)];
    },
    [MOVE_DOWN]: (currentlySelectedNodeId) => {
        const visibleNodeIds = getVisibleNodeIds();
        const indexOfCurrentlySelectedNode = visibleNodeIds.indexOf(currentlySelectedNodeId);

        return visibleNodeIds[Math.min(indexOfCurrentlySelectedNode + 1, visibleNodeIds.length - 1)];
    },
});