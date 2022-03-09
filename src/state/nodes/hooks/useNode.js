import {useNodes} from "./useNodes";

export const useNode = (id) => {
    return useNodes()[id];
};