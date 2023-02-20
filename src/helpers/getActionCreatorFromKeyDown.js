export const CTRL = 'CTRL';
export const SHIFT = 'SHIFT';
export const ALT = 'ALT';

export const ENTER = 13;
export const LEFT = 37;
export const UP = 38;
export const RIGHT = 39;
export const DOWN = 40;
export const PLUS = 187;
export const TAB = 9;

export const getActionCreatorFromKeyDown = ({keyCode, ctrlKey, shiftKey, altKey}, keyToActionMap) => {
    if (ctrlKey && shiftKey && altKey) {
        return (keyToActionMap[CTRL+SHIFT+ALT] || {})[keyCode];
    }

    if (ctrlKey && shiftKey) {
        return (keyToActionMap[CTRL+SHIFT] || {})[keyCode];
    }

    if (ctrlKey && altKey) {
        return (keyToActionMap[CTRL+ALT] || {})[keyCode];
    }

    if (shiftKey && altKey) {
        return (keyToActionMap[SHIFT+ALT] || {})[keyCode];
    }

    if (ctrlKey) {
        return (keyToActionMap[CTRL] || {})[keyCode];
    }

    if (shiftKey) {
        return (keyToActionMap[SHIFT] || {})[keyCode];
    }

    if (altKey) {
        return (keyToActionMap[ALT] || {})[keyCode];
    }

    return keyToActionMap[keyCode];
}