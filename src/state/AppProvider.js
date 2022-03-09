import React from 'react';
import {NodesProvider} from "./nodes/NodesContext";

const combineComponents = (...components) => components.reduce(
    (AccumulatedComponents, CurrentComponent) => ({children}) =>
        <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>,
    ({children}) => <>{children}</>
);

export const AppProvider = combineComponents(
    NodesProvider,
);