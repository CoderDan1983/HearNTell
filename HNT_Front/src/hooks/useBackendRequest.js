import axios from '../api/axios';

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

export function logFormData(formData){
    let returnArray = [];
    for(const pair of formData.entries()) {
        // console.log(`${pair[0]}, ${pair[1]}`);
        returnArray.push({ key: pair[0], value: pair[1] })
    }
    return returnArray;
}

//* for "private" routes
export const getThenSet_private = (axiosPrivate, navigate, location, setter, path, { _id } = {})=>{
    const url = _id ? `/${path}/${_id}` : `/${path}/`
    console.log('url is: ', url);
    let isMounted = true;
    const controller = new AbortController();

    const getSomething = async () => {
        console.log('running getThenSet_private: ')
        try {
            console.log('trying again...')
            const response = await axiosPrivate.get(url, { // ./users
                signal: controller.signal
            });
            // const userNames = response.data.map(user => user.username); //grab usernames only. :)
            // console.log(response.data);
            // // console.log(userNames);
            isMounted && setter(response.data) //if isMounted, then setUsers :D
            // console.log('stateVal is: ');
            // console.log(stateVal); //why undefined???
            //the parameter was response.data, but we didn't need to set/send all that :)
        }
        catch (err){
            console.log("I'm gonna log an error!")
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

export const postThenSet_private = (axiosPrivate, navigate, location, setValue, path, { _id, payload } = {})=>{
    const url = _id ? `/${path}/${_id}` : `/${path}/`
    let isMounted = true;
    const controller = new AbortController();

    const postSomething = async () => {
        console.log('running postThenSet_private: ')
        try {
            console.log('trying again...')
            const response = await axiosPrivate.post(url, 
            JSON.stringify(payload),
            {
                signal: controller.signal
            });
            // const userNames = response.data.map(user => user.username); //grab usernames only. :)
            // console.log(response.data);
            // // console.log(userNames);
            isMounted && setValue(response.data) //if isMounted, then setUsers :D
            // console.log('the stateVal is: ');
            // console.log(stateVal); //why undefined???
            //the parameter was response.data, but we didn't need to set/send all that :)
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


export const post_private = (axiosPrivate, navigate, location, path, { _id, payload, options } = {})=>{
    const url = _id ? `/${path}/${_id}` : `/${path}/`
    let isMounted = true;
    const controller = new AbortController();
    // headers: { "Content-Type" : "multipart/for"}
    // 
    const postSomething = async () => {
         const axiosOptions = options ? { ...options, signal: controller.signal } : 
        { signal: controller.signal }
        console.log('running postThenSet_private.  axiosOptions are: ', axiosOptions)
        try {
            console.log('trying again...')
            const response = await axiosPrivate.post(url, 
            JSON.stringify(payload),
            axiosOptions);
            // const userNames = response.data.map(user => user.username); //grab usernames only. :)
            console.log(response.data);
            // // console.log(userNames);
            // isMounted && setValue(response.data) //if isMounted, then setUsers :D
            // console.log('the stateVal is: ');
            // console.log(stateVal); //why undefined???
            //the parameter was response.data, but we didn't need to set/send all that :)
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
export const post_formData = (someAxiosPassedIn, navigate, location, path, { _id, payload, options, setter } = {})=>{
    const url = _id ? `/${path}/${_id}` : `/${path}/`
    let isMounted = true;
    const controller = new AbortController();
    // headers: { "Content-Type" : "multipart/for"}
    // 
    const postSomething = async () => {
         const axiosOptions = //options ? { ...options, signal: controller.signal } : 
        { signal: controller.signal }
        //headers: payload.getHeaders()
        console.log('running postThenSet_private.  axiosOptions are: ', axiosOptions)

        try {
            console.log('trying again...')
            const response = await someAxiosPassedIn.post(url, 
            payload,
            axiosOptions);
            // const userNames = response.data.map(user => user.username); //grab usernames only. :)
            console.log('response data is: ', response.data, typeof(response.data));
            // // console.log(userNames);
            console.log('the setter is: ', setter);
            isMounted && setter && setter(response.data) //if isMounted, then setUsers :D
            // console.log('the stateVal is: ');
            // console.log(stateVal); //why undefined???
            //the parameter was response.data, but we didn't need to set/send all that :)
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
export const getThenSet_public = (setter, path, { _id } = {}) => {
    const url = _id ? `/${path}/${_id}` : `/${path}/`
    let isMounted = true;
    const controller = new AbortController();

    const getSomething = async () => {
        console.log('running getThenSet_public: ')
        try{
            const response = await axios.get(url ,{ //`/api/story/${story_id}`
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                signal: controller.signal,
            });
            console.log(typeof(response?.data));
            console.log(response?.data);
            isMounted && setter(response.data);
            // if(story?.data){
            //     const data = story.data;
            //     if(Array.isArray(setter)){
            //         for(let s=0; s < setter.length; s++){
            //             setter[s].setter(data[setter[s].key]);
            //         }
            //     }
            //     else{
            //         setter(data);
            //     }
            // }
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

//^ for setter: pass in a single setter, or an array of { setter: setSomething, key: "something" }
export async function postByIdThenSet(setter, path, { _id, payload } = {} ){
    const url = _id ? `/${path}/${_id}` : `/${path}/`
    try{
        const story = await axios.post(url , 
        JSON.stringify(payload),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log(story?.data);
        if(story?.data){
            const data = story.data;
            if(Array.isArray(setter)){
                for(let s=0; s < setter.length; s++){
                    setter[s].setter(data[setter[s].key]);
                }
            }
            else{
                setter(data);
            }
        }
    }
    catch(err){
        console.log(err);
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
// //^ for setter: pass in a single setter, or an array of { setter: setSomething, key: "something" }
// export async function postByIdThenSet(setter, path, { _id, payload } = {} ){
//     const url = _id ? `/${path}/${_id}` : `/${path}/`
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