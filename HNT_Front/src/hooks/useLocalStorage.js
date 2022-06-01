import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {  //SSR (ie- server side react, such as Next.js)
    //* in case this is serverside and we don't have a windows object.
    if (typeof window === 'undefined') return initValue;

    //if a value is already stored
    const localValue = JSON.parse(localStorage.getItem(key));
    if(localValue) return localValue;

    if(initValue instanceof Function) return initValue();

    return initValue;
}
const useLocalStorage = (key, initValue) => {
    //const [value, setValue] = useState(JSON.parse(localStorage.getItem(key))||initValue);
    const [value, setValue] = useState(()=>{
        return getLocalValue(key, initValue);
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;