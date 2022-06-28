import '../../index.css';
import { useState } from 'react';

export default function ObjFormComponent({ obj, includeL = [], excludeL = [], 
    classy = "", wrapClass = "", propClass = "", valClass = "", formy = "" }){
    const displayObject = includeL.length ? include(obj, includeL) : exclude(obj, excludeL);
    // const displayArray = Object.keys(displayObject);

    return(<div className={ classy } id={ formy }>
        { displayObject.map((property, i)=>{
            let type = "input";
            let value = obj[property];
            if(typeof(value) === "boolean"){ type = "checkbox" }

            return (<div key={i} className={ wrapClass }>
                <label key={i} htmlFor={ property }>
                    { property }:
                </label>{' '}
                <input 
                    key={`${property}${i}`}
                    type = { type }  
                    id={ property } name={ property }
                    defaultValue = { value } 
                />
                {/* { typeof(value) === "boolean" && } */}
            </div>)
        })}
    </div>)
}

function exclude(obj, filter){
    const result = filter.filter((item)=>{
        return obj[item] === undefined; // && arrayForm.push({ key: item, value: obj[item] })
    });

    return result;
}

function include(obj, filter){
    const result = filter.filter((item)=>{
        return obj[item] !== undefined; // && arrayForm.push({ key: item, value: obj[item] })
    });

    return result;
}