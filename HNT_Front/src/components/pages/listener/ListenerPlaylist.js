import { useState } from 'react';

import { fakeStories } from '../../fakeApi/fakeStories';
import StoryItem from '../../parts/StoryItem';
import { DeleteForever } from '@mui/icons-material';
import '../../../index.css';

export default function ListenerPlaylist({ playlistName }){
    const [playlist, setPlaylist] = useState(fakeStories);
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
                        to= { story.to }
                        Ico= { DeleteForever }
                    />)
                })}
            </div>
        </div>
    )

}