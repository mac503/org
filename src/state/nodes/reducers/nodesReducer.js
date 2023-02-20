import {createReducer} from "../../../helpers/createReducer";
import {toggleComplete, updateNodeContent} from "./nodeReducer";

export const ROOT_NODE = 'ROOT_NODE';

export const CREATE_NODE = 'CREATE_NODE';
export const UPDATE_NODE_CONTENT = 'UPDATE_NODE_CONTENT';
export const TOGGLE_NODE_IS_COMPLETE = 'TOGGLE_NODE_IS_COMPLETE';
export const MOVE_NODE = 'MOVE_NODE';

const EMPTY_NODE = {
    content: '',
    isComplete: false,
    estimate: 0,
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
    [TOGGLE_NODE_IS_COMPLETE]: (state, {id}) => ({
        ...state,
        [id]: toggleComplete(state[id]),
    }),
    [CREATE_NODE]: (state, {newId, parentId, previousSiblingId}) => {
        const parentNode = state[parentId];

        const indexOfNewNodeInSiblings = parentNode.children.indexOf(previousSiblingId);

        const newSiblings = [...parentNode.children];
        newSiblings.splice(indexOfNewNodeInSiblings + 1, 0, newId);

        return {
            ...state,
            [parentId]: {
                ...state[parentId],
                children: newSiblings,
            },
            [newId]: EMPTY_NODE,
        };
    },
    [MOVE_NODE]: (state, {id, newParentId, newPreviousSiblingId}) => {
        const [oldParentId, oldParentNode] = Object.entries(state).find(([, node]) => node.children.includes(id));

        const oldSiblings = [...oldParentNode.children];
        const indexOfIdInOldSiblings = oldSiblings.indexOf(id);
        oldSiblings.splice(indexOfIdInOldSiblings, 1);

        const newParentNode = state[newParentId];

        const newSiblings = [...newParentNode.children];
        const indexOfNewPreviousSiblingIdInInSiblings = newSiblings.indexOf(newPreviousSiblingId);
        newSiblings.splice(
            -1 === indexOfNewPreviousSiblingIdInInSiblings
                ? newSiblings.length
                : indexOfNewPreviousSiblingIdInInSiblings,
0,
            id
        );

        return {
            ...state,
            [oldParentId]: {
                ...oldParentNode,
                children: oldSiblings,
            },
            [newParentId]: {
                ...newParentNode,
                children: newSiblings,
            },
        };
    },
});