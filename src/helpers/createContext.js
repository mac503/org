import React, {useEffect, useReducer, useRef} from "react";
import {combineReducers} from "./combineReducers";

export const createContext = (reducers, loadedState, preMiddleware = [], postMiddleware = []) => {
    const {reducer: combinedReducer, initialState} = combineReducers(reducers, loadedState);

    const Context = React.createContext(initialState);

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(combinedReducer, initialState);

        const actionRef = useRef();

        const dispatchWithMiddleware = (action) => {
            preMiddleware.forEach((middlewareFunction) => {
                middlewareFunction(action, state);
            });

            actionRef.current = action;

            dispatch(action);
        }

        useEffect(() => {
            if (!actionRef.current) {
                return;
            }

            postMiddleware.forEach((middlewareFunction) => {
                middlewareFunction(actionRef.current, state);
            });

            actionRef.current = null;
        }, [actionRef, state]);

        return <Context.Provider value={[state, dispatchWithMiddleware]}>
            {children}
        </Context.Provider>
    };

    return {
        Context,
        Provider,
    };
}