import {selectedNodeReducer} from "./reducers/selectedNodeReducer";
import {createContext} from "../../helpers/createContext";

export const {Context: UiContext, Provider: UiProvider} = createContext(
    {selectedNode: selectedNodeReducer},
);