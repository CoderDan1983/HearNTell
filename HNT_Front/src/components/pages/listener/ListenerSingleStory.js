import { useState } from 'react'
import { useParams } from 'react-router-dom';

import RatingComponent from "../../parts/RatingComponent";
import LinkListItem from "../../parts/LinkListItem";
import ShareThisStory from "../../parts/ShareThisStory";
import { fakeStories, loadStoriesByTag } from '../../fakeApi/fakeStories';

import axios from '../../../api/axios';
// import axios from '../../api/axios';

export default function ListenerSingleStory(){
    const { title, rating, author, length, tags, to, _id } = fakeStories[1];
    const [stories, setStories] = useState();
    const { story_id } = useParams();
    async function getStory(story_id){
        const story = await axios.get(`/api/story/${story_id}`,{
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return story;
    }
    
    const st = getStory(story_id);
    console.log(st);

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
                    key={ i }
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

