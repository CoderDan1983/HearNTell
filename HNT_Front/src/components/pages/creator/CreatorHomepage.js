import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import AudioItem from "./AudioItem";
import StoryItem from '../../parts/StoryItem';
import useAuth from "../../../hooks/useAuth";
import './../../../index.css';

import TagsInput from "../../parts/TagsInput";
// import { Autocomplete, TextField } from '@mui/material';
import LinkListItem from "../../parts/LinkListItem";

import { get_private, post_private, delete_private } from '../../../hooks/useBackendRequest';

export default function CreatorHomepage({ name, imageUrl }){
    const nav = useNavigate();
    const loc = useLocation();
    const axP = useAxiosPrivate();
    const [ stories, setStories ] = useState([]);
    // const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ playlists, setPlaylists ] = useState([]);

    useEffect(()=>{
        get_private(axP, nav, loc, 'story/creator', { setter: setStories }); //, { _id: "..." }
        get_private(axP, nav, loc, 'playlist/user', { _id: "all", setter: setPlaylists });
    },[nav, loc, axP]);

    // console.log('playlists is: ', playlists);

    console.log('stories are: ', stories);
    const auth = useAuth();
    const accessToken = auth?.accessToken;
    console.log('accessToken is: ');
    console.log(accessToken);
    const selectedTags = tags => { console.log(tags) };
    // console.log('selectedIndex: ', selectedIndex)
    function getOptions(rawPlaylists = [], is_creator){
        // const defaultFunct = (e, i)=> { 
        //     console.log('i am: ', i, e)
        // };
        function queueFirst(a, b){
            return b.playlist.is_queue - a.playlist.is_queue;
        }

        function handleAddToPlaylist(event, option, story){
            console.log('handleAddToPlaylist', event, option, story);
            const { playlist } = option;
            post_private(axP, nav, loc, `playlist/${ playlist._id }/story/${ story._id }`, { payload: playlist });
        }
        function handleEditStory(event, option, story){
            console.log('handleEditStory',  event, option, story, story._id);
            //const { playlist } = option;
            nav(`/creatorEditStory/${story._id}`, { state: { from: loc }, replace: true }); //todo go to some edit story page (?)
        }
        function handleDeleteStory(event, option, story){
            console.log('handleDeleteStory',  event, option, story, story._id);
            const { playlist } = option;
            delete_private(axP, nav, loc, 'story', { _id: story._id, payload: playlist });
        }

        const playlists = rawPlaylists.map((playlist)=> {
            return {
                label: `Add to ${ playlist.title }`,
                playlist: playlist,
                funct: handleAddToPlaylist,
            }
        });

        playlists.sort(queueFirst); //make sure queue is at the top of the list :)
        let starter = [...playlists];

        is_creator && starter.push({ label: "edit", funct: handleEditStory });
        is_creator && starter.push({ label: "delete", funct: handleDeleteStory });

        return starter;
    }

    const options = getOptions(playlists, true);

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

    

    return(
        <>
            <h1>Welcome, { name }</h1>

            <TagsInput selectedTags={ selectedTags } />
            <LinkListItem name="Edit Profile" to="/editCreatorProfile" />
            <LinkListItem name="Add Story" to="/creatorAddStory" />

            <div>
                <h2>My Stories</h2>
                { stories.map((story, i)=>{
                    return (
                        <div key={`wrapper_${i}`} className="two">
                            <StoryItem story={ story } to= "/" key={`story_${i}`} />
                            <div key= { i }>
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
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

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