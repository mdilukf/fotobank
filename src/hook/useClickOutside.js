import React, {useEffect} from "react";

export const useClickOutside = (ref, callback) => {
    const handlClick =(e)=>{
        if (ref.current && !ref.current.contains(e.target)){
            callback();
        }
    };
    useEffect(()=> {
        document.addEventListener("mousedown", handlClick);
        return () => {
            document.removeEventListener("mousedown", handlClick);
        };
    });
};