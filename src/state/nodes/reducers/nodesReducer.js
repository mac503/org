import {createReducer} from "../../../helpers/createReducer";
import {updateNodeContent} from "./nodeReducer";

export const ROOT_NODE = 'ROOT_NODE';

export const UPDATE_NODE_CONTENT = 'UPDATE_NODE_CONTENT';

const EMPTY_NODE = {
    content: '',
    isComplete: false,
    children: []
};

const node2 = {
    ...EMPTY_NODE,
    content: 'node2',
};
const node3 = {
    ...EMPTY_NODE,
    content: 'node3',
};

const node1 = {
    ...EMPTY_NODE,
    content: 'node1',
    children: [
        'node2',
        'node3',
    ]
};

const rootNode = {
    children: [
        'node1',
    ]
};

export const initialState = {
    [ROOT_NODE]: rootNode,
    node1,
    node2,
    node3,
}

export const nodesReducer = createReducer(initialState, {
    [UPDATE_NODE_CONTENT]: (state, {id, content}) => ({
        ...state,
        [id]: updateNodeContent(state[id], content),
    }),
});