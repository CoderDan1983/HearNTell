import { useState, useMemo } from 'react'
import { useParams, } from 'react-router-dom';
// import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import RatingComponent from "../../parts/RatingComponent";
import LinkListItem from "../../parts/LinkListItem";
import ShareThisStory from "../../parts/ShareThisStory";
import { fakeStories, loadStoriesByTag } from '../../fakeApi/fakeStories';
import { getThenSet_public } from '../../../hooks/useBackendRequest';

// import axios from '../../api/axios';

export default function ListenerSingleStory(){
    // const axP = useAxiosPrivate();
    // const nav = useNavigate();
    // const loc = useLocation();

    const { title, rating, author, length, tags, to, _id } = fakeStories[1];
    //const [stories, setStories] = useState();
    const [story, setStory] = useState({});
    const { story_id } = useParams();

    //* this fetches the story with story_id, and sets the story to the returned value :)
    useMemo(() => getThenSet_public(setStory, 'getpublic/story', { _id: story_id }),[story_id]);
    

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

