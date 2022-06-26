import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import StoryItem from '../../parts/StoryItem';
import { DeleteForever } from '@mui/icons-material';
import '../../../index.css';
import { get_private } from '../../../hooks/useBackendRequest'

export default function ListenerPlaylist({ playlistName }){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();

    const [playlist, setPlaylist] = useState([]); //fakeStories
    const { story_id } = useParams();

    //* this fetches the story with story_id, and sets the story to the returned value :)
    // useMemo(() => { 
    //     get_private(axP, nav, loc, setPlaylist, 'playlist', { _id: story_id }) },
    // [axP, nav, loc, story_id]);
    useEffect(() => { 
        get_private(axP, nav, loc, 'playlist', { _id: story_id, setter: setPlaylist }) },
    [axP, nav, loc, story_id]);

    return(
        <div className="main fullWidth"> 
            <h1 className='center'>{playlistName} Playlist</h1>
            {/* <div className="playListTop">
                <button>Add Story</button>
            </div> */}

            <div className="center">           
                { playlist.map((story, index)=>{
                    return ( !story.private && 
                    (<div key = { index }>
                        <StoryItem 
                            story = { story }
                            key= { index }
                            to= { `/listener/${story._id}` }
                            Ico= { DeleteForever }
                        />
                    </div>))
                })}
            </div>
        </div>
    )

}