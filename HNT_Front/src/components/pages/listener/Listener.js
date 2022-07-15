
import '../../../index.css';
import { useState, useEffect } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useGetRoles } from '../../../hooks/useRoles'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation, useParams } from "react-router-dom";

// import { Link } from 'react-router-dom';
import SearchComponent from '../../parts/SearchComponent';
import SearchInterface from '../../parts/SearchInterface';
import LinkListItem from '../../parts/LinkListItem';
import ModalWrapper from '../../parts/ModalWrapper';
import CreatePlaylist from './CreatePlaylist';
import { storyMenu, playlistsMenu } from '../../../hooks/useMenus';

// import ListenerPlaylist from './ListenerPlaylist';
// import { fakeStories, fakeStories1, fakeTags, fakeSearches, fakeSubList, fakeBaskets, 
//     fakeQueue } from '../../fakeApi/fakeStories';
import { get_private } from '../../../hooks/useBackendRequest';
import { DeleteForever } from '@mui/icons-material';
import { createSetter } from '../../../custom_modules_front/utility_front';
export default function Listener(){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    
    // const auth = useAuth();
    // const { decoded, roles } = useGetRoles();
    // const accessToken = auth?.accessToken;
    // console.log('auth is: ', auth);
    const params = useParams()
    const user_id = params.user_id || "0a"; //* default testing value :)
    const [searches, setSearches] = useState([]);
    
    const [ mySubscriptions, setMySubscriptions ] = useState([]);

    const [myPlaylists, setMyPlaylists] = useState([]);
    const goTo = "../listener";
    const forPlaylistsMenu = { nav, loc, axP, goTo };
    const playlistOptions = { can_remove_playlist: true, subscribe_option: false }; //creator_mode: false, 

    const [queue, setQueue] = useState({});
    const [queueStories, setQueueStories] = useState([]);
    const addPlaylistSetter = createSetter(myPlaylists, setMyPlaylists, { push: true });
    // console.log('addPlaylistSetter: ', addPlaylistSetter);
    // const [loading, setLoading] = useState(false);

    function queueSetter(info){
        const { queue: queueI, stories: storiesI } = info;
        setQueue(queueI);
        setQueueStories(storiesI);
        console.log('queueSetter.  queue is: ', queueI, ', queueStories is: ', storiesI);
    }

    console.log('render!', user_id)
    useEffect(() => {
        get_private(axP, nav, loc, 'search', { _id: user_id, setter: setSearches });
        // get_private(axP, nav, loc, 'subscription/listener', { _id: user_id, setter: setMySubscriptions });
        get_private(axP, nav, loc, 'subscription/account', { setter: setMySubscriptions });
        
        get_private(axP, nav, loc, 'playlist/user', { setter: setMyPlaylists });
        get_private(axP, nav, loc, 'playlist/queue', { setter: queueSetter });
        // get_private(axP, nav, loc, 'playlist/myBaskets', { _id: user_id, setter: setMyPlaylists });
        // get_private(axP, nav, loc, 'queue', { _id: user_id, setter: setQueue });
        
        console.log('listener should be loaded this render :) ');
    },[axP, nav, loc, user_id]);

    console.log('mySubscriptions are : ', mySubscriptions)

    // const query = {
    //     sortBy: "age",
    //     desc: true,
    //     limit: 10,
    // }

    // console.log(queryParamString(query))
    // console.log('queue is: ', queue, queue.story_ids);

    const playlistSubscriptions = mySubscriptions.filter((sub)=> sub.playlist_id);
    const creatorSubscriptions = mySubscriptions.filter((sub)=> !sub.playlist_id);
    

    return(<div className='main'>
        <div className="hearAStory">
        <h1 className="consulting">Hear a Story</h1>
        {/* <SearchComponent options={ searches } /> */}

        <SearchInterface options={ searches }/>
    </div>
    <div className="listenerGroups">
        <div className="mainItems">
            <div>
                People I subscribe to
                { creatorSubscriptions && creatorSubscriptions.map((sub, i)=>{
                    
                    const name = sub.playlist_id ? 
                    `${sub.creator.name} - ${ sub.playlist.title }` : 
                    sub.creator.name;
                    return (sub.status === "approved" ? 
                    <LinkListItem 
                        key={ `${sub.listener_id}_${i}` } 
                        to= "/creatorProfile"
                        name={ name } 
                        Ico={ DeleteForever }
                        _id = { sub.creator_id } 
                    /> : <div key={ `${sub.listener_id}_${i}` } ></div>)
                })}
            </div>
        </div>
        <div className="mainItems">
            <div>
                Playlists I subscribe to
                { playlistSubscriptions && playlistSubscriptions.map((sub, i)=>{
                    const menu = { 
                        general: playlistsMenu(forPlaylistsMenu, sub.playlist, null, playlistSubscriptions, { subscribe_option: true }),
                    }
                    const name = sub.playlist_id ? 
                    `${sub.creator.name} - ${ sub.playlist.title }` : 
                    sub.creator.name;
                    return (sub.status === "approved" ? 
                    <LinkListItem 
                        key={ `${sub.listener_id}_${i}` } 
                        to= "/creatorProfile"
                        name={ name } 
                        // Ico={ DeleteForever }
                        menu = { menu }
                        _id = { sub.creator_id } 
                    /> : <div key={ `${sub.listener_id}_${i}` } ></div>)
                })}
            </div>
        </div>
        <div className="mainItems">
            <div>
                My Playlists
                { console.log('myPlaylists is: ', myPlaylists)}
                { myPlaylists && myPlaylists.map((playlist, i)=>{
                    const playlistMenu = { 
                        general: playlistsMenu(forPlaylistsMenu, playlist, null, mySubscriptions, playlistOptions),
                    }
                    return (
                        !playlist.is_creator_list ? 
                        <LinkListItem 
                            key={ `${ playlist._id }_${i}` } 
                            to= "/listenerPlaylist"
                            name={ playlist.title }
                            _id = { playlist._id } 
                            menu = { playlistMenu }
                        /> : 
                        <div key={ `${ playlist._id }_${i}` }></div>
                    ) 
                })}
            </div>
            {/* <button>Add Playlist</button> */}
            <ModalWrapper buttonTitle="Create Playlist">
                <CreatePlaylist is_creator_list = { false } setter = { addPlaylistSetter } />
            </ModalWrapper>
        </div>
        <div className="mainItems">
            <div>
                MyQueue <br />
                (Where does this go?)
            </div>
            { queueStories && queueStories.length && queueStories.map((story, i)=>{
                return (<LinkListItem 
                    key={ `${ story._id }_${i}` } 
                    to= "/listenerSingleStory" 
                    name={ story.title } 
                    _id = { story._id }
                />)
            })}
        </div>
    </div>
    </div>)
}