import {useContext} from 'react';
import {NodesContext} from "../NodesContext";

export const useNodes = () => {
    const [{nodes}] = useContext(NodesContext);

    return nodes;
};