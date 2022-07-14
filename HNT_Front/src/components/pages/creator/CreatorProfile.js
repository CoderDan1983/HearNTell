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

    // const forTheMenu = { nav, loc, axP, goTo }
    const { creator_id } = useParams();
    const goTo = `../../creatorProfile/${ creator_id }`; //* essentially
    const forPlaylistsMenu = { nav, loc, axP, goTo };
    const playlistOptions = { can_remove_playlist: false, subscribe_option: true }; //creator_mode: false, 
    
    const [ creatorProfile, setCreatorProfile ] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [ mySubscriptions, setMySubscriptions ] = useState([]);
    useEffect(()=>{
        // get_private(axP, nav, loc, 'story/creator', { setter: setStories }); //, { _id: "..." }
        get_private(axP, nav, loc, 'subscription/account', { setter: setMySubscriptions });
        get_private(axP, nav, loc, 'playlist/creator', { _id: creator_id, setter: setPlaylists });
        get_private(axP, nav, loc, `creator/profile/${creator_id}`, { setter: setCreatorProfile });
    },[nav, loc, axP, creator_id]);

    console.log('creatorProfile is: ', creatorProfile);
    console.log('playlists is: ', playlists);
    console.log('mySubscriptions is: ', mySubscriptions);

    //@ subscribe to creator options
    //* note this followCreator is checking not only if we are subscribed, but if we are subscribed to the author themselves!
    const followCreator = (mySubscriptions && mySubscriptions.length && creator_id) && 
        mySubscriptions.filter((sub)=> (sub.creator_id === creator_id)&&(!sub.playlist_id));
    const is_following_creator = (followCreator && followCreator.length) ? true : false;
    const subscription_id = is_following_creator ? followCreator[0]._id : "";
    let title, offer;
    

    function unsubscribe(subscription_id){
        delete_private(axP, nav, loc, 'subscription', { _id: subscription_id, goTo });
    }
    function subscribe(creator_id){
        post_private(axP, nav, loc, 'subscription/', { payload: { creator_id }, goTo });
    }
    //* if "subscribed" and not rejected, offer opportunity to cancel request ^_^
    if(is_following_creator){
        if (followCreator[0].status !== "rejected"){
            if (followCreator[0].status === "approved"){ //unsubscribe from an approved status
                title = `Unsubscribe from ${ followCreator[0].creator.name }`
                offer = "unsubscribe";
            }
            else{ //cancel a pending status
                title  = `Cancel Subscription Request to ${ followCreator[0].creator.name }`;
                offer = "cancel";
            } 
        }
    }else{ // if not subscribed, offer the opportunity to subscribe
        title = `Subscribe to ${ creatorProfile?.creator?.name }`;
        offer = "subscribe";
    }

    return(
        <>
            <h1 className="home">Creator Profile Page</h1>
            { creatorProfile && <ProfileComponent profile = { creatorProfile } /> }
            { creatorProfile && <button type="button" onClick = { (e) => {
                console.log("creator_id: ", creator_id, "subscription_id: ", subscription_id, "offer: ", offer)
                offer === "subscribe" && subscribe(creator_id);
                offer !== "subscribe" && unsubscribe(subscription_id);
            }}>{ title }</button> }

            <div>
                <div className="mainItems">
                    Created Playlists
                    { console.log('playlists is: ', playlists)}
                    { playlists && playlists.map((playlist, i)=>{ //story is currently 'null' ^_^
                        //* I count is_creator_playlist as 'false' because it's "listener style" here
                        console.log('89.  playlist is: ', playlist)
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

