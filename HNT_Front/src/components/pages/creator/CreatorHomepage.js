import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import AudioItem from "./AudioItem";
import useAuth from "../../../hooks/useAuth";
import './../../../index.css';

import TagsInput from "../../parts/TagsInput";
// import { Autocomplete, TextField } from '@mui/material';
import LinkListItem from "../../parts/LinkListItem";

import { getThenSet_private } from '../../../hooks/useBackendRequest';

export default function CreatorHomepage({ name, imageUrl }){
    const nav = useNavigate();
    const loc = useLocation();
    const axP = useAxiosPrivate();
    const [ stories, setStories ] = useState([]);

    useEffect(()=>{
        getThenSet_private(axP, nav, loc, setStories, 'story/creator'); //, { _id: "..." }
    },[nav, loc, axP]);

    console.log('stories are: ', stories);
    const auth = useAuth();
    const accessToken = auth?.accessToken;
    console.log('accessToken is: ');
    console.log(accessToken);
    const selectedTags = tags => { console.log(tags) };
    const exampleStories = [
        {
            title: "old mcDonald bought the farm",
            _id: "1",
            tags: ["animal", "rhymn","reason"]
        },
        {
            title: "old mcDonald bought a hat",
            _id: "2",
            tags: ["dirt", "swimming","reason"]
        },
        {
            title: "old mcDonald bought grocery store",
            _id: "3",
            tags: ["elephants", "dogs","cats"]
        },
    ]

    const top100Films = ["mitt", "romney", "style"]

    // function goToEditProfile(){
    //     console.log('gotToCreatorAddStory was clicked')
    //     return(<Link to="/editCreatorProfile" />)        
    // }

    // function goToCreatorAddStory(){
    //     console.log('gotToCreatorAddStory was clicked')
    //     return(<Link to="/creatorAddStory" />)
    // }

    

    return(
        <>
            <h1>Welcome, { name }</h1>

            <TagsInput selectedTags={ selectedTags } />
            {/* <button onClick={ (e) => goToEditProfile }>Edit Profile</button>
            <button><Link to="/creatorAddStory"> Add Story </Link></button> */}
            <LinkListItem name="Edit Profile" to="/editCreatorProfile" />
            <LinkListItem name="Add Story" to="/creatorAddStory" />

            <div>
                <h2>My Stories</h2>
                { exampleStories.map((story)=>{
                    return (
                        <AudioItem className="audioItem" key={story._id} 
                        title={ story.title } id={ story._id } />
                    )
                })}
            </div>
        </>
    )
}



{/* <Autocomplete
disablePortal
id="combo-box-demo"
options={top100Films}
sx={{ width: 300 }}
renderInput={(params) => <TextField {...params} label="Forced" />}
/>
<Autocomplete
freeSolo={ true }
disablePortal
id="combo-box-demo1"
options={top100Films}
sx={{ width: 300 }}
renderInput={(params) => <TextField {...params} label="Free" />}
/> */}