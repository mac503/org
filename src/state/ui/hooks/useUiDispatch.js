import {useContext} from 'react';
import {UiContext} from "../UiContext";

export const useUiDispatch = () => {
    const [, dispatch] = useContext(UiContext);

    return dispatch;
};