import {useContext} from 'react';
import {NodesContext} from "../NodesContext";

export const useNodesDispatch = () => {
    const [, dispatch] = useContext(NodesContext);

    return dispatch;
};