export const getVisibleNodeIds = () => [...document.querySelectorAll('.node[data-node-id]')].map(nodeElement => nodeElement.dataset.nodeId);
export const getPreviousVisibleNodeId = (id) => {
    const visibleNodeIds = getVisibleNodeIds();
    return visibleNodeIds[Math.max(visibleNodeIds.indexOf(id) - 1, 0)]
}
export const getNextVisibleNodeId = (id) => {
    const visibleNodeIds = getVisibleNodeIds();
    return visibleNodeIds[Math.min(visibleNodeIds.indexOf(id) + 1, visibleNodeIds.length - 1)]
}
