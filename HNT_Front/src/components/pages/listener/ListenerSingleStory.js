import { useState } from 'react'

import RatingComponent from "../../parts/RatingComponent";
import LinkListItem from "../../parts/LinkListItem";
import ShareThisStory from "../../parts/ShareThisStory";
import { fakeStories, loadStoriesByTag } from '../../fakeApi/fakeStories';

export default function ListenerSingleStory(){
    const { title, rating, author, length, tags, to, _id } = fakeStories[0];
    const [stories, setStories] = useState()
    return(<div className="main">
        <div>

        </div>
        <div>The Player Goes here</div>
        <LinkListItem _id={ _id } name="Rate this Story" to= { to }/>
        <RatingComponent readOnly={ true } rating={ rating }/>
        <div className="flexWrapper mainItems">
            Tags:{' '}
            { tags && tags.map((tag, i)=>{
                return (<LinkListItem 
                    _id= { i } 
                    to={`tags/${tag}`} 
                    name= { tag } 
                    classy="tags" 
                />)
            })}
        </div>
        <ShareThisStory _id= { _id } />
    </div>)
}