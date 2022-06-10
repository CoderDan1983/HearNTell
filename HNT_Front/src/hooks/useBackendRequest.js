import axios from '../api/axios';

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

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

//* for "public" routes. (well, it can be used for that ^_^ )
// //^ for setter: pass in a single setter, or an array of { setter: setSomething, key: "something" }
// export async function getThenSet_public(url, setter){
//     try{
//         const story = await axios.get(url ,{ //`/api/story/${story_id}`
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true
//         });
//         // console.log(story?.data);
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

//^ for setter: pass in a single setter, or an array of { setter: setSomething, key: "something" }
export async function getThenSet_public(setter, path, { _id } = {}){
    const url = _id ? `/${path}/${_id}` : `/${path}/`
    try{
        const story = await axios.get(url ,{ //`/api/story/${story_id}`
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log(typeof(story?.data));
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