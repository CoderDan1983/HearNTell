
import '../../../index.css';
import { useState, useMemo, useEffect } from 'react';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";

// import { Link } from 'react-router-dom';
import SearchComponent from '../../parts/SearchComponent';
import LinkListItem from '../../parts/LinkListItem';
// import ListenerPlaylist from './ListenerPlaylist';
// import { fakeStories, fakeStories1, fakeTags, fakeSearches, fakeSubList, fakeBaskets, 
//     fakeQueue } from '../../fakeApi/fakeStories';
import { getThenSet_private } from '../../../hooks/useBackendRequest';
import { DeleteForever } from '@mui/icons-material';


export default function Listener(){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    
    const user_id = "0a"; //* later this will be passed in/found :D
    const [searches, setSearches] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [queue, setQueue] = useState([]);
    // const [loading, setLoading] = useState(false);
    console.log('render!', user_id)
    useEffect(() => {
        getThenSet_private(axP, nav, loc, setSearches, 'search', { _id: user_id });
        getThenSet_private(axP, nav, loc, setSubscriptions, 'subscription/listener', { _id: user_id });
        getThenSet_private(axP, nav, loc, setPlaylists, 'playlist/myBaskets', { _id: user_id });
        getThenSet_private(axP, nav, loc, setQueue, 'queue', { _id: user_id });
        
        console.log('listener should be loaded this render :) ');
    },[axP, nav, loc, user_id]);

    return(<div className='main'>
        <div className="hearAStory">
        <h1 className="consulting">Hear a Story</h1>
        <SearchComponent options={ searches } />
    </div>
    <div className="listenerGroups">
        <div className="mainItems">
            <div>
                People I subscribe to
                { subscriptions && subscriptions.map((sub)=>{
                    return (<LinkListItem 
                        key={sub._id} 
                        to= "/creatorProfile"
                        name={ sub.author } 
                        Ico={ DeleteForever }
                        _id = { sub._id } 
                    />)
                })}
            </div>
        </div>
        <div className="mainItems">
            <div>
                My Playlists
                { console.log('playlists is: ', playlists)}
                { playlists && playlists.map((playlist)=>{
                    console.log('playlist is: ')
                    console.log(playlist)
                    return (<LinkListItem 
                        key={ playlist._id } 
                        to= "/listenerPlaylist"
                        name={ playlist.title }
                        _id = { playlist._id } 
                    />)
                })}
            </div>
            <button>Add Playlist</button>
        </div>
        <div className="mainItems">
            <div>
                MyQueue <br />
                (Where does this go?)
            </div>
            { queue && queue.map((item)=>{
                return (<LinkListItem 
                    key={item._id} 
                    to= "/listenerSingleStory" 
                    name={ item.title } 
                    _id = { item._id }
                />)
            })}
        </div>
    </div>
    </div>)
}



{/* <div className='main'>
<ListenerPlaylist playlistName="Jommys"/>        
</div> */}