import { useState } from "react";

export default function useLocalStorageState(key, initialValue) {
    function getStoredValue() {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    };

    const [state, setState] = useState(getStoredValue);

    const setStoredValue = (newState) => {
        const valueToStore = typeof newState === 'function' ? newState(state) : newState;
        localStorage.setItem(key, JSON.stringify(valueToStore));
        setState(valueToStore);
    };

    return [state, setStoredValue];
}
