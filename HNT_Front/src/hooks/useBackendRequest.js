import axios from '../api/axios';

//^ for setter: pass in a single setter, or an array of { setter: setSomething, key: "something" }
export async function getThenSet(url, setter){
    try{
        const story = await axios.get(url ,{ //`/api/story/${story_id}`
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        // console.log(story?.data);
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
export async function getByIdThenSet(path, _id, setter){
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
export async function postByIdThenSet(path, _id, payload={}, setter){
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