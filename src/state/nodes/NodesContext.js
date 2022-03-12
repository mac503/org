import {nodesReducer} from "./reducers/nodesReducer";
import {createContext} from "../../helpers/createContext";
import {loadFromLocalStorage, saveToLocalStorage} from "../../helpers/localStorage";
import {useNodesDispatch} from "./hooks/useNodesDispatch";
import {useEffect} from "react";
import {NEW_STATE_KEY, RELOAD_STATE} from "../../helpers/combineReducers";

const LOCAL_STORAGE_NODES_KEY = 'NODES_STATE';
const calculateBackupStateKey = () => `${LOCAL_STORAGE_NODES_KEY}--${new Date().toISOString().split('T')[0]}`;
const MAX_DAILY_BACKUP_ACTIONS_TO_SAVE = 50;

const loadedState = loadFromLocalStorage(LOCAL_STORAGE_NODES_KEY);

const saveStatePostMiddleware = (action, state) => {
    if (RELOAD_STATE === action.type) {
        return;
    }

    saveToLocalStorage(LOCAL_STORAGE_NODES_KEY, state);

    const backupStateKey = calculateBackupStateKey();

    saveToLocalStorage(
        backupStateKey,
        [
            [new Date().toISOString(), action, state],
            ...loadFromLocalStorage(backupStateKey) ?? [],
        ].slice(0, MAX_DAILY_BACKUP_ACTIONS_TO_SAVE),
    );
}

export const {Context: NodesContext, Provider: NodesProvider} = createContext({nodes: nodesReducer}, loadedState, [], [
    saveStatePostMiddleware,
]);

export const NodesContextStorageChangeListener = ({children}) => {
    const nodesDispatch = useNodesDispatch();

    useEffect(() => {
        window.addEventListener('storage', ({key, newValue}) => {
            if (LOCAL_STORAGE_NODES_KEY === key) {
                const deserialized = JSON.parse(newValue);

                nodesDispatch({
                    type: RELOAD_STATE,
                    [NEW_STATE_KEY]: deserialized,
                });
            }
        });
    });

    return <>{children}</>;
}