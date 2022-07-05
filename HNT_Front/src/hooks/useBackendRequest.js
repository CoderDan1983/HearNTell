import axios from '../api/axios';

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

//@ Part A) HELPER FUNCTIONS
export function logFormData(formData){
    let returnArray = [];
    for(const pair of formData.entries()) {
        // console.log(`${pair[0]}, ${pair[1]}`);
        returnArray.push({ key: pair[0], value: pair[1] })
    }
    return returnArray;
}

function queryParamString(obj){
    let returnString = '?'
    const objLength = Object.keys(obj).length;
    let count = 0;
    for(let key in obj){
        returnString += (`${key}=${obj[key]}`);
        if(count + 1 < objLength) returnString += "&";
        count++;
    }
    return returnString;
}

function createFullURL(path, { _id, queries }){
    let url = `/${path}/`;
    let queryString = "";

    if(_id) url += `${_id}`;
    if(queries) queryString = queryParamString(queries)
    
    url += queryString;

    return url;
}

//^ used in conjuction w/ a "dig" array to dig through object/arrays to return the info we seek :)
//* NOTE:  Will return undefined if not found :)
export function lumpDig(lump, keys) { 
    return keys.reduce((obj, key) => { //* inital value/previous value of function, current value
        //* this is returning undefined or a value. I guess it's undefined + value = value (?)
        console.log(key, obj?.[key]);
        return obj?.[key] 
    }, lump);
}

//@ Part B: Route Control: get_private, post_private, post_formData, delete_private, get_public
//* for "private" routes
export const get_private = (axiosPrivate, navigate, location, path, { _id, queries, dig, options, setter, goTo } = {})=>{
    const url = createFullURL(path, { _id, queries });

    // console.log('url is: ', url);
    let isMounted = true;
    const controller = new AbortController();

    const getSomething = async () => {
        console.log('running get_private: ')
        try {
            console.log('trying again...')
            const axiosOptions = options ? 
            { signal: controller.signal, ...options } : 
            { signal: controller.signal }

            const response = await axiosPrivate.get(url, axiosOptions);
            // const userNames = response.data.map(user => user.username); //grab usernames only. :)
            console.log('response.data to the url ' + url + ' is ', response.data);

            const returnVal = dig ? lumpDig(response.data, dig) : response.data;
            isMounted && setter && setter(returnVal) //if isMounted, then setUsers :D
            isMounted && goTo && navigate(goTo, { state: { from: location }, replace: true });
        }
        catch (err){
            console.log("we got an error with the request to : ", url)
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true })
        }
    }
    getSomething();

    return () =>{ //* cleanup function ^_^
        isMounted = false;
        controller.abort();
    }
}

export const post_private = (axiosPrivate, navigate, location, path, 
    { _id, payload, queries, dig, options, setter, goTo } = {})=>{
    const url = createFullURL(path, { _id, queries });
    let isMounted = true;
    const controller = new AbortController();
    // headers: { "Content-Type" : "multipart/for"}
    // 
    const postSomething = async () => {
        try {
            const axiosOptions = options ? { signal: controller.signal, ...options } : 
            { signal: controller.signal }
            console.log('running post_private.  axiosOptions are: ', axiosOptions)

            console.log('trying again...')
            const response = await axiosPrivate.post( url, 
                JSON.stringify(payload),
                axiosOptions
            );

            const returnVal = dig ? lumpDig(response.data, dig) : response.data;
            isMounted && setter && setter(returnVal) //if isMounted, then setUsers :D
            isMounted && goTo && navigate(goTo, { state: { from: location }, replace: true });
            
            console.log(response.data);
        }
        catch (err){
            console.log("I'm gonna log an error!")
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true })
        }
    }
    postSomething();

    return () =>{ //* cleanup function ^_^
        isMounted = false;
        controller.abort();
    }
}

export const delete_private = (axiosPrivate, navigate, location, path, 
    { _id, queries, dig, options, setter, goTo } = {})=>{
    const url = createFullURL(path, { _id, queries });
    let isMounted = true;
    const controller = new AbortController();
    // headers: { "Content-Type" : "multipart/for"}
    // 
    const postSomething = async () => {
        try {
            const axiosOptions = options ? { signal: controller.signal, ...options } : 
            { signal: controller.signal }
            console.log('running delete_private.  axiosOptions are: ', axiosOptions)

            console.log('trying again...')
            const response = await axiosPrivate.delete( url, 
                axiosOptions
            );

            const returnVal = dig ? lumpDig(response.data, dig) : response.data;
            isMounted && setter && setter(returnVal) //if isMounted, then setUsers :D
            isMounted && goTo && navigate(goTo, { state: { from: location }, replace: true });

            console.log(response.data);
        }
        catch (err){
            console.log("I'm gonna log an error!")
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true })
        }
    }
    postSomething();

    return () =>{ //* cleanup function ^_^
        isMounted = false;
        controller.abort();
    }
}


// const res = await axios.post('https://httpbin.org/post', formData, {
//   headers: formData.getHeaders()
// });
export const post_formData = (someAxiosPassedIn, navigate, location, path, 
    { _id, payload, queries, dig, options, setter, goTo } = {})=>{
    const url = createFullURL(path, { _id, queries });
    let isMounted = true;
    const controller = new AbortController();
    // headers: { "Content-Type" : "multipart/form"}
    // headers: payload.getHeaders()
    const postSomething = async () => {
        try {
            const axiosOptions = options ? { signal: controller.signal, ...options } : 
            { signal: controller.signal }

            console.log('trying again...')
            const response = await someAxiosPassedIn.post(url, payload, axiosOptions);
            // const userNames = response.data.map(user => user.username); //grab usernames only. :)
            console.log('response data is: ', response.data, typeof(response.data));

            console.log('the setter is: ', setter);
            const returnVal = dig ? lumpDig(response.data, dig) : response.data;
            isMounted && setter && setter(returnVal) //if isMounted, then setUsers :D
            isMounted && goTo && navigate(goTo, { state: { from: location }, replace: true });
        }
        catch (err){
            console.log("I'm gonna log an error!")
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true })
        }
    }
    postSomething();

    return () =>{ //* cleanup function ^_^
        isMounted = false;
        controller.abort();
    }
}

//* for "public" routes. (well, it can be used for that ^_^ )
//^ for setter: pass in a single setter, or an array of { setter: setSomething, key: "something" }
//? add a goTo !??!
export const get_public = (path, { _id, queries, dig, options, setter } = {}) => {
    const url = createFullURL(path, { _id, queries });
    let isMounted = true;
    const controller = new AbortController();

    const getSomething = async () => {
        console.log('running get_public: ')
        try{
            let axiosOptions = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                signal: controller.signal,
            }
            if(options) axiosOptions = { ...axiosOptions, ...options}
            
            const response = await axios.get(url, axiosOptions);
            const returnVal = dig ? lumpDig(response.data, dig) : response.data;
            isMounted && setter && setter(returnVal);
        }
        catch(err){
            console.log(err);
        }
    }

    getSomething();

    return () =>{ //* cleanup function ^_^
        isMounted = false;
        controller.abort();
    }
}



// export async function getThenSet_public(setter, path, { _id } = {}){
//     const url = _id ? `/${path}/${_id}` : `/${path}/`
//     let isMounted = true;
//     const controller = new AbortController();
//     try{
//         const story = await axios.get(url ,{ //`/api/story/${story_id}`
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true
//         });
//         console.log(typeof(story?.data));
//         console.log(story?.data);
//         if(story?.data){
//             const data = story.data;
//             if(Array.isArray(setter)){
//                 for(let s=0; s < setter.length; s++){
//                     setter[s].setter(data[setter[s].key]);
//                 }
//             }
//             else{
//                 setter(data);
//             }
//         }
//     }
//     catch(err){
//         console.log(err);
//     }

//     return () =>{ //* cleanup function ^_^
//         isMounted = false;
//         controller.abort();
//     }
// }

//* the function below was built to query an array of stuff :D
// //^ for setter: pass in a single setter, or an array of { setter: setSomething, key: "something" }
// export async function postByIdThenSet(setter, path, { _id, queries, dig, options, payload } = {} ){
//     const url = createFullURL(path, { _id, queries });
//     try{
//         const story = await axios.post(url , 
//         JSON.stringify(payload),
//         {
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true
//         });
//         console.log(story?.data);
//         if(story?.data){
//             const data = story.data;
//             if(Array.isArray(setter)){
//                 for(let s=0; s < setter.length; s++){
//                     setter[s].setter(data[setter[s].key]);
//                 }
//             }
//             else{
//                 setter(data);
//             }
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// export const postThenSet_private = (axiosPrivate, navigate, location, setValue, path, { _id, queries, dig, options, payload } = {})=>{
//     // const url = _id ? `/${path}/${_id}` : `/${path}/`
//     const url = createFullURL(path, { _id, queries });
//     let isMounted = true;
//     const controller = new AbortController();

//     const postSomething = async () => {
//         console.log('running postThenSet_private: ')
//         try {
//             console.log('trying again...')
//             const axiosOptions = options ? 
//             { signal: controller.signal, ...options } : 
//             { signal: controller.signal }

//             const response = await axiosPrivate.post(
//                 url, 
//                 JSON.stringify(payload),
//                 axiosOptions
//             );
//             // const userNames = response.data.map(user => user.username); //grab usernames only. :)
//             const returnVal = dig ? lumpDig(response.data, dig) : response.data;
//             isMounted && setValue(returnVal) //if isMounted, then setUsers :D
//         }
//         catch (err){
//             console.log("I'm gonna log an error!")
//             console.error(err);
//             navigate('/login', { state: { from: location }, replace: true })
//         }
//     }
//     postSomething();

//     return () =>{ //* cleanup function ^_^
//         isMounted = false;
//         controller.abort();
//     }
// }