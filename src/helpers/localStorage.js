export const loadFromLocalStorage = (key) => {
    const serialized = localStorage.getItem(key);

    if (!serialized) {
        return;
    }

    let deserialized;

    try {
        deserialized = JSON.parse(serialized);
    } catch (e) {
        return;
    }

    return deserialized;
}

export const saveToLocalStorage = (key, value) => {
    const serialized = JSON.stringify(value);

    localStorage.setItem(key, serialized);
}