import {useContext} from 'react';
import {UiContext} from "../UiContext";

export const useSelectedNode = () => {
    const [{selectedNode}] = useContext(UiContext);

    return selectedNode;
};