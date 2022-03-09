import {nodesReducer} from "./reducers/nodesReducer";
import {createContext} from "../../helpers/createContext";

export const {Context: NodesContext, Provider: NodesProvider} = createContext({nodes: nodesReducer});