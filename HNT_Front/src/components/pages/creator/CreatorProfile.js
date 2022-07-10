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
import { storyMenu, playlistsMenu } from '../../../hooks/useMenus';
import { get_private, post_private, delete_private } from '../../../hooks/useBackendRequest';


export default function CreatorProfile(){    
    const nav = useNavigate();
    const loc = useLocation();
    const axP = useAxiosPrivate();
    const goTo = "/";
    // const forTheMenu = { nav, loc, axP, goTo }
    const forPlaylistsMenu = { nav, loc, axP };
    const playlistOptions = { creator_mode: false, can_remove_playlist: false, subscribe_option: true };

    const { creator_id } = useParams();
    const [ profile, setProfile ] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [ mySubscriptions, setMySubscriptions ] = useState([]);
    useEffect(()=>{
        // get_private(axP, nav, loc, 'story/creator', { setter: setStories }); //, { _id: "..." }
        get_private(axP, nav, loc, 'subscription/account', { setter: setMySubscriptions });
        get_private(axP, nav, loc, 'playlist/creator', { _id: creator_id, setter: setPlaylists });
        get_private(axP, nav, loc, `creator/profile/${creator_id}`, { setter: setProfile });
    },[nav, loc, axP, creator_id]);

    console.log('profile is: ', profile);
    console.log('playlists is: ', playlists);
    console.log('mySubscriptions is: ', mySubscriptions);

    return(
        <>
            <h1 className="home">Creator Profile Page</h1>
            { profile && <ProfileComponent profile = { profile } /> }


            <div>
                <div className="mainItems">
                    Created Playlists
                    { console.log('playlists is: ', playlists)}
                    { playlists && playlists.map((playlist, i)=>{ //story is currently 'null' ^_^
                        //* I count is_creator_playlist as 'false' because it's "listener style" here
                        const playlistMenu = { 
                            general: playlistsMenu(forPlaylistsMenu, playlist, null, mySubscriptions, playlistOptions),
                        }
                        console.log('95.  playlistMenus is: ', playlistMenu);
                        return (
                            playlist.is_creator_list ? 
                            <LinkListItem 
                                key={ playlist._id } 
                                to= "/listenerPlaylist"
                                name={ playlist.title }
                                _id = { playlist._id } 
                                menu = { playlistMenu }
                            /> : 
                            <div key={ playlist._id } ></div>
                        ) 
                    })}
                </div>
            </div>
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

