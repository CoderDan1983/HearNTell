import { Link } from "react-router-dom";

import AudioItem from "./AudioItem";
import useAuth from "../../../hooks/useAuth";
import './../../../index.css';

import TagsInput from "../../parts/TagsInput";
import { Autocomplete, TextField } from '@mui/material';
import LinkListItem from "../../parts/LinkListItem";

export default function CreatorHomepage({ name, imageUrl }){
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
            <Autocomplete
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
            />
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