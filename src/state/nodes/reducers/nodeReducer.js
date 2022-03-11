export const updateNodeContent = (node, content) => ({
    ...node,
    content,
});

export const toggleComplete = (node) => ({
    ...node,
    isComplete: !node.isComplete,
});