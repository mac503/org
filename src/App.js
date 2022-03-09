import './App.scss';
import {AppProvider} from "./state/AppProvider";
import {RootNode} from "./components/nodes/RootNode";

export const App = () => <AppProvider>
    <RootNode />
</AppProvider>;