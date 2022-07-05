import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import MenuIcon from '@mui/icons-material/Menu';
import StoryItem from '../../parts/StoryItem';
// import useAuth from "../../../hooks/useAuth";
import './../../../index.css';

import TagsInput from "../../parts/TagsInput";
// import { Autocomplete, TextField } from '@mui/material';

import ProfileComponent from "../../parts/ProfileComponent";
import LinkListItem from "../../parts/LinkListItem";
import { createPlaylistMenu } from '../../../hooks/useMenus';
import { get_private, post_private, delete_private } from '../../../hooks/useBackendRequest';


export default function CreatorProfile(){
    const nav = useNavigate();
    const loc = useLocation();
    const axP = useAxiosPrivate();
    const goTo = "/";
    const forTheMenu = { nav, loc, axP, goTo }
    const { creator_id } = useParams();
    const [ profile, setProfile ] = useState({});
    useEffect(()=>{
        // get_private(axP, nav, loc, 'story/creator', { setter: setStories }); //, { _id: "..." }
        // get_private(axP, nav, loc, 'playlist/user', { _id: "all", setter: setPlaylists });
        get_private(axP, nav, loc, `creator/profile/${creator_id}`, { setter: setProfile });
    },[nav, loc, axP, creator_id]);

    console.log('profile is: ', profile);

    return(
        <>
            <h1 className="home">Creator Profile Page</h1>
            <ProfileComponent profile = { profile } />
            <form>

            </form>
        </>
    )
}

//listener's view of creator profile
//basic info name, picture, 
//stories listed.

//creator profile
//creator homepage

// DataTransferItemList, description, tags


//creator homepage
//see story list
//create a new story
//edit
//delete

//update profile

