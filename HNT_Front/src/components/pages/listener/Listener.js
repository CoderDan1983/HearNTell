
import '../../../index.css';
import { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';
import SearchComponent from '../../parts/SearchComponent';
import LinkListItem from '../../parts/LinkListItem';
// import ListenerPlaylist from './ListenerPlaylist';
// import { fakeStories, fakeStories1, fakeTags, fakeSearches, fakeSubList, fakeBaskets, 
//     fakeQueue } from '../../fakeApi/fakeStories';
import { getByIdThenSet } from '../../../hooks/useBackendRequest';
import { DeleteForever } from '@mui/icons-material';


export default function Listener(){
    const user_id = "0a"; //* later this will be passed in/found :D
    const [searches, setSearches] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [queue, setQueue] = useState([]);

    useMemo(() => {
        getByIdThenSet('search', user_id, setSearches);
        getByIdThenSet('subscription/listener', user_id, setSubscriptions);
        getByIdThenSet('playlist', user_id, setPlaylists);
        getByIdThenSet('queue', user_id, setQueue);
        console.log('listener should be loaded this render :) ')
    },[user_id]);

    return(<div className='main'>
        <div className="hearAStory">
        <h1 className="consulting">Hear a Story</h1>
        <SearchComponent options={ searches } />
    </div>
    <div className="listenerGroups">
        <div className="mainItems">
            <div>
                People I subscribe to
                { subscriptions.sublist && subscriptions.sublist.map((sub)=>{
                    return (<LinkListItem 
                        key={sub._id} 
                        to= "/creatorProfile"
                        name={ sub.author } 
                        Ico={ DeleteForever }
                    />)
                })}
            </div>
        </div>
        <div className="mainItems">
            <div>
                My Playlists
                { playlists.playlists && playlists.playlists.map((playlist)=>{
                    return (<LinkListItem 
                        key={ playlist._id } 
                        to= "/listenerPlaylist"
                        name={ playlist.title } 
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
            { queue.queue && queue.queue.map((item)=>{
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