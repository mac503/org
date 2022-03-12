import {createReducer} from "../../../helpers/createReducer";
import {getPreviousVisibleNodeId, getNextVisibleNodeId} from "../../../helpers/getVisibleNodeIds";

export const SELECT_NODE = 'SELECT_NODE';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';

// TODO remove
const NODE_1 = 'node1';

export const selectedNodeReducer = createReducer(NODE_1, {
    [SELECT_NODE]: ({}, {id}) => id,
    [MOVE_UP]: (currentlySelectedNodeId) => getPreviousVisibleNodeId(currentlySelectedNodeId),
    [MOVE_DOWN]: (currentlySelectedNodeId) => getNextVisibleNodeId(currentlySelectedNodeId),
});