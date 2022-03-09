import {mapObject} from "./mapObject";

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
        reducer: (state = initialState, action = {}) => combined(state, action),
        initialState,
    };
}