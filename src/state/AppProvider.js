import React from 'react';
import {NodesContextStorageChangeListener, NodesProvider} from "./nodes/NodesContext";
import {UiProvider} from "./ui/UiContext";

const combineComponents = (...components) => components.reduce(
    (AccumulatedComponents, CurrentComponent) => ({children}) =>
        <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>,
    ({children}) => <>{children}</>
);

export const AppProvider = combineComponents(
    NodesProvider,
    NodesContextStorageChangeListener,
    UiProvider,
);