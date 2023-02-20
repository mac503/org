import {useNodes} from "./useNodes";

export const useParentNode = (id) => {
    const nodes = useNodes();
    const [, parentNode] = Object.entries(nodes).find(([, node]) => node.children.includes(id));

    return parentNode;
};