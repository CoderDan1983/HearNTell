import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { createPlaylistMenu } from '../../../hooks/useMenus';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AudioItem from "./AudioItem";
import StoryItem from '../../parts/StoryItem';
// import useAuth from "../../../hooks/useAuth";
import './../../../index.css';

import TagsInput from "../../parts/TagsInput";
// import { Autocomplete, TextField } from '@mui/material';
import LinkListItem from "../../parts/LinkListItem";

import { get_private } from '../../../hooks/useBackendRequest';

export default function CreatorHomepage({ name, imageUrl }){
    const nav = useNavigate();
    const loc = useLocation();
    const axP = useAxiosPrivate();
    const goTo = '../creatorHomepage';
    const forTheMenu = { nav, loc, axP, goTo }
    const [ stories, setStories ] = useState([]);
    // const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ playlists, setPlaylists ] = useState([]);
    const [ profile, setProfile ] = useState({});

    const user_id = playlists.length? playlists[0]["user_id"] : "";
    console.log("user_id is: ", user_id);
    console.log('profile is: ', profile)

    useEffect(()=>{
        // get_private(axP, nav, loc, 'creator/profile/self', { setter: setProfile }); //, { _id: "..." }
        get_private(axP, nav, loc, 'story/creator', { setter: setStories }); //, { _id: "..." }
        get_private(axP, nav, loc, 'playlist/user', { _id: "all", setter: setPlaylists });
    },[nav, loc, axP]);

    // console.log('playlists are: ', playlists);
    // const auth = useAuth();
    // const accessToken = auth?.accessToken;

    // console.log('stories are: ', stories);
    // console.log('accessToken is: ');
    // console.log(accessToken);

    const selectedTags = tags => { console.log(tags) };
    // console.log('selectedIndex: ', selectedIndex)
    

    // let example = [{
    //     handleClick: (e, i { general, special: story }) => { console.log('running') },
    //     playlist: 'something',
    //     title: "bobby",
    // }];

    return(
        <>
            <h1>Welcome, { name }</h1>

            <TagsInput selectedTags={ selectedTags } />
            <LinkListItem name="View My Profile" to= { `/creatorProfile/${ user_id }` } />
            <LinkListItem name="Edit Profile" to="/creatorProfile/edit" />
            <LinkListItem name="Add Story" to="/creatorAddStory" />

            <div>
                <h2>My Stories</h2>
                { stories.map((story, i)=>{

                    const menu = {
                        general: createPlaylistMenu(forTheMenu, playlists, story, true)
                    }
                    
                    return (
                        <div key={`wrapper_${i}`} className="two">
                            <StoryItem 
                            // IcoArray = { IcoArray } 
                            story={ story } to= "/" key={`story_${i}`} menu = { menu } />
                            
                            
                        </div>
                    )
                })}
            </div>
        </>
    )
}


// const [ preIco, setPreIco ] = useState(false);

    // function preIcoClickHandler(e){
    //     setPreIco(!preIco);
    //     console.log('preIcoClickHandler.  e is: ', e, ', preIco is: ', preIco);
    // }
    // const IcoArray = [
    //     { Icon: MenuIcon, clickHandler: preIcoClickHandler }
    // ]
    
//    let menu = [
//         { title: "progress", handleClick: (e, item)=> { console.log('e is: ', e, ', item is: ', item)}},
//         { title: "regress", handleClick: (e, item)=> { console.log('e is: ', e, ', item is: ', item)}},
//         { title: "success", handleClick: (e, item)=> { console.log('e is: ', e, ', item is: ', item)}},
//     ]
    // const exampleStories = [
    //     {
    //         title: "old mcDonald bought the farm",
    //         _id: "1",
    //         tags: ["animal", "rhymn","reason"]
    //     },
    //     {
    //         title: "old mcDonald bought a hat",
    //         _id: "2",
    //         tags: ["dirt", "swimming","reason"]
    //     },
    //     {
    //         title: "old mcDonald bought grocery store",
    //         _id: "3",
    //         tags: ["elephants", "dogs","cats"]
    //     },
    // ]

    // const top100Films = ["mitt", "romney", "style"]

    // function goToEditProfile(){
    //     console.log('gotToCreatorAddStory was clicked')
    //     return(<Link to="/editCreatorProfile" />)        
    // }

    // function goToCreatorAddStory(){
    //     console.log('gotToCreatorAddStory was clicked')
    //     return(<Link to="/creatorAddStory" />)
    // }

{/* <select
value={choice}
defaultValue={"default"}
onChange={(e) => setChoice(e.target.value)}
>
<option value={"default"} disabled>
    Choose an option
</option>
<option value={"one"}>One</option>
<option value={"two"}>Two</option>
<option value={"three"}>Three</option>
</select> */}


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




{/* <div key= { i }>
    <select 
        id= {`option_menu_${i}`}
        name="option_menu"
        
        defaultValue={"default"}
        // onChange={ (e) => setSelectedIndex(e.target.selectedIndex - 1) }
    >
        <option value={"default"} disabled hidden> Choose An option </option>
        { options.length && options.map((option, j)=>{
            return (<option 
                value= { i } 
                key={`option_${i}_${j}`}
            >
                { option.label }
            </option>)
        })}
    </select>
    <button type='button' onClick={ (e)=> {
        const selectedIndex = document.getElementById(`option_menu_${i}`).selectedIndex - 1;
        if(selectedIndex >= 0){
            const option = options[selectedIndex];
            // console.log('option is: ', option, story, selectedIndex, typeof(selectedIndex));
            option.funct(e, option, story) 
        }
        else{
            console.log('please select an option!')
        }
    }}>
        Do It!
    </button>
</div> */}