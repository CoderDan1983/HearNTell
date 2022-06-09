
import '../../../index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from '../../parts/SearchComponent';
import LinkListItem from '../../parts/LinkListItem';
import ListenerPlaylist from './ListenerPlaylist';
import { fakeStories, fakeStories1, fakeTags, fakeSearches, fakeSubList, fakeBaskets, 
    fakeQueue } from '../../fakeApi/fakeStories';

import { DeleteForever } from '@mui/icons-material';


export default function Listener(){
    const searches = fakeSearches;
    const subscribeList = fakeSubList;
    const baskets = fakeBaskets;
    const queue = fakeQueue;

    return(<div className='main'>
        <div className="hearAStory">
        <h1 className="consulting">Hear a Story</h1>
        <SearchComponent options={ searches } />
    </div>
    <div className="listenerGroups">
        <div className="mainItems">
            <div>
                People I subscribe to
                { subscribeList && subscribeList.map((sub)=>{
                    return (<LinkListItem 
                        key={sub._id} 
                        to={ sub.to } 
                        name={ sub.name } 
                        Ico={ DeleteForever }
                    />)
                })}
            </div>
        </div>
        <div className="mainItems">
            <div>
                My Playlists
                { baskets && baskets.map((basket)=>{
                    return <LinkListItem key={basket._id} to={ basket.to } name={ basket.name } />
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
                    to={ item.to } 
                    name={ item.name } 
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