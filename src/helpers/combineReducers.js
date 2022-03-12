import {mapObject} from "./mapObject";

export const RELOAD_STATE = 'RELOAD_STATE';
export const NEW_STATE_KEY = 'newState';

export const combineReducers = (reducers, loadedState = null) => {
    const combined = (state, action, entireState) => mapObject(
        reducers,
        (value, key) => {
            if (typeof value === 'function') {
                return value(state[key], action, entireState);
            }

            return (state, action, entireState) => (combineReducers(value)(state[key], action, entireState));
        }
    );

    const initialState = loadedState ?? combined({}, {});

    return {
        reducer: (state = initialState, action = {}) => {
            if (RELOAD_STATE === action.type) {
                return action[NEW_STATE_KEY];
            }

            return combined(state, action);
        },
        initialState,
    };
}