import {parseContentKeywords} from "./contentKeywords/parseContentKeywords";

export const updateNodeContent = (node, content) => ({
    ...node,
    content,
    ...parseContentKeywords(content),
});

export const toggleComplete = (node) => ({
    ...node,
    isComplete: !node.isComplete,
});