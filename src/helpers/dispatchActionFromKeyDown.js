import {getActionCreatorFromKeyDown} from "./getActionCreatorFromKeyDown";

export const dispatchActionFromKeyDown = (...actionSets) => (e) => {
    for (let [keyToActionMap, dispatch, namedArgs] of actionSets) {

        const actionCreator = getActionCreatorFromKeyDown(e, keyToActionMap);

        if (actionCreator) {
            dispatch(actionCreator(namedArgs, e));

            return;
        }
    }
}