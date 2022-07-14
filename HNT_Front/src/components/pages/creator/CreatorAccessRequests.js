import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import { storyMenu, playlistsMenu } from '../../../hooks/useMenus';

import MenuIcon from '@mui/icons-material/Menu';
// import AudioItem from "./AudioItem";
import StoryItem from '../../parts/StoryItem';

// import ModalWrapper from '../../parts/ModalWrapper';
// import CreatePlaylist from '../listener/CreatePlaylist';

// import useAuth from "../../../hooks/useAuth";
import './../../../index.css';

// import TagsInput from "../../parts/TagsInput";
import { Done, DoDisturb } from '@mui/icons-material';
import LinkListItem from "../../parts/LinkListItem";

import { get_private, post_private, delete_private } from '../../../hooks/useBackendRequest';
// import { createSetter } from '../../../custom_modules_front/utility_front';

export default function CreatorAccessRequests(){
    const nav = useNavigate();
    const loc = useLocation();
    const axP = useAxiosPrivate();
    const [ subscribers, setSubscribers ] = useState([]);
    const goTo = '../creatorAccessRequests'; //for refreshing purposes :)
    function handleApprove(e, i, subscription_id){
        console.log('approving with a subscription_id of ', subscription_id); //62cb6f1592e8496dbca93b01
        post_private(axP, nav, loc, `subscription/request/${subscription_id}/approve`, { goTo });
    }

    function handleReject(e, i, subscription_id){
        console.log('rejecting with a subscription_id of ', subscription_id);
        delete_private(axP, nav, loc, 'subscription/', { _id: subscription_id, goTo });
    } //62cb6f1592e8496dbca93b01
    useEffect(()=>{
        get_private(axP, nav, loc, 'subscription/subscribers', { setter: setSubscribers });
    
    }, [nav, loc, axP]);

    console.log('subscriptions are: ', subscribers);

    return(<div>
        <h1>Add Creator Access Requests Content here</h1>
        { subscribers.length && subscribers.map((subscriber, i) => {
            let IcoArray = [];
            subscriber.status !== "approved" && 
            IcoArray.push({ 
                Icon: Done, 
                clickHandler: handleApprove, 
                info: subscriber._id, 
                class: "approveSurround" 
            });
            subscriber.status !== "rejected" && 
            IcoArray.push({ 
                Icon: DoDisturb, 
                clickHandler: handleReject, 
                info: subscriber._id,
                class: "rejectSurround", 
            })
            // alert(subscriber.listener_id);
            const name = subscriber.playlist_id ? 
                `${subscriber.listener.name} for playlist:  ${subscriber?.playlist?.title}` : 
                subscriber.listener.name;
            return(<LinkListItem 
                key = { i }
                to = { `../../creatorProfile/${ subscriber.listener_id }` }
                name = { name }
                IcoArray = { IcoArray }
            />);
        })}
    </div>)
}