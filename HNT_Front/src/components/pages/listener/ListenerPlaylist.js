import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import StoryItem from '../../parts/StoryItem';
import { DeleteForever } from '@mui/icons-material';
import '../../../index.css';
import { get_private } from '../../../hooks/useBackendRequest';

import ObjFormComponent from '../../parts/ObjFormComponent';
import DisplayObjComponent from '../../parts/DisplayObjComponent';

export default function ListenerPlaylist({ playlistName }){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();

    const formRef = useRef();

    const [playlist, setPlaylist] = useState({}); //fakeStories
    const [stories, setStories] = useState([]);

    const { story_id } = useParams(); //isn't this the playist_id instead!?!
    console.log('stories: ', stories, ', playlist: ', playlist)
    function setStoriesAndPlaylist(obj){
        obj["playlist"] && setPlaylist(obj["playlist"]);
        obj["stories"] && setStories(obj["stories"]);
    }
    //* this fetches the story with story_id, and sets the story to the returned value :)
    // useMemo(() => { 
    //     get_private(axP, nav, loc, setPlaylist, 'playlist', { _id: story_id }) },
    // [axP, nav, loc, story_id]);
    useEffect(() => { 
        get_private(axP, nav, loc, 'playlist', { _id: story_id, setter: setStoriesAndPlaylist }) },
    [axP, nav, loc, story_id]);

    return(
        <div className="main fullWidth"> 
            <h1 className='center'>{playlistName} Playlist</h1>
            {/* <div className="playListTop">
                <button>Add Story</button>
            </div> */}
            { playlist && <DisplayObjComponent 
                obj = { playlist }
                includeL={["title", "description"]}
                added="dis"
                wrapClass='leftTwoGether'
            /> }
            { playlist && (<form ref={ formRef }>
                <ObjFormComponent 
                    obj={ playlist } 
                    includeL={["title", "description"]}
                    formy = { formRef.current }
                    wrapClass='leftTwoGether'
                />
            </form>)}
            <div className="center">           
                { stories.length && stories.map((story, index)=>{
                    return ( !story.private && 
                    (<div key = { index }>
                        <StoryItem 
                            story = { story }
                            key= { index }
                            // to= { `/listener/${story._id}` }
                            to= { `/listenerSingleStory/${story._id}` }
                            IcoArray = { [{ Icon: DeleteForever }] }
                        />
                    </div>))
                })}
            </div>
        </div>
    )

}