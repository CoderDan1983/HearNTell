import '../../../index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from '../../parts/SearchComponent';
import LinkListItem from '../../parts/LinkListItem';
import { fakeStories, fakeStories1, fakeTags, fakeSearches, fakeSubList, fakeBaskets, 
    fakeQueue } from '../../fakeApi/fakeStories';

export default function Listener(){
    const searches = fakeSearches;
    const subscribeList = fakeSubList;
    const baskets = fakeBaskets;
    const queue = fakeQueue

    return(
        <div className='main'>
            <div className="hearAStory">
                <h1 className="consulting">Hear a Story</h1>
                <SearchComponent options={ searches } />
            </div>
            <div className="listenerGroups">
                <div className="mainItems">
                    <div>
                        People I subscribe to
                        { subscribeList && subscribeList.map((sub)=>{
                            return <LinkListItem key={sub._id} to={ sub.to } name={ sub.name } />
                        })}
                    </div>
                </div>
                <div className="mainItems">
                    <div>
                        My Baskets
                        { baskets && baskets.map((basket)=>{
                            return <LinkListItem key={basket._id} to={ basket.to } name={ basket.name } />
                        })}
                    </div>
                </div>
                <div className="mainItems">
                    <div>
                        MyQueue
                    </div>
                    { queue && queue.map((item)=>{
                        return <LinkListItem key={item._id} to={ item.to } name={ item.name } />
                    })}
                </div>
            </div>
        </div>
    )
}