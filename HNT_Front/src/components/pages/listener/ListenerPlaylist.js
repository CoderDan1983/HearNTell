import { useState, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { fakeStories } from '../../fakeApi/fakeStories';
import StoryItem from '../../parts/StoryItem';
import { DeleteForever } from '@mui/icons-material';
import '../../../index.css';
import { getThenSet_private } from '../../../hooks/useBackendRequest'

export default function ListenerPlaylist({ playlistName }){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();

    const [playlist, setPlaylist] = useState([]); //fakeStories
    const { story_id } = useParams();

    //* this fetches the story with story_id, and sets the story to the returned value :)
    useMemo(() => { 
        getThenSet_private(axP, nav, loc, setPlaylist, 'playlist', { _id: story_id }) },
    [axP, nav, loc, story_id]);

    return(
        <div className="main fullWidth"> 
            <h1 className='center'>{playlistName} Playlist</h1>
            {/* <div className="playListTop">
                <button>Add Story</button>
            </div> */}

            <div className="center">           
                { playlist.map((story, index)=>{
                    return (<StoryItem 
                        key= { index }
                        title={story.title} 
                        rating={story.rating}
                        author={story.author}
                        length={story.length} 
                        tags={story.tags}
                        to= { `/listener/${story._id}` }
                        Ico= { DeleteForever }
                    />)
                })}
            </div>
        </div>
    )

}