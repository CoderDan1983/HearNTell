import { useState, useMemo, useEffect, useCallback } from 'react'
import { useParams, } from 'react-router-dom';
// import useEventListener from '../../../hooks/useEventListener';
// import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import RatingComponent from "../../parts/RatingComponent";
import LinkListItem from "../../parts/LinkListItem";
import ShareThisStory from "../../parts/ShareThisStory";
// import { fakeStories, loadStoriesByTag } from '../../fakeApi/fakeStories';
import { getThenSet_public } from '../../../hooks/useBackendRequest';

// import axios from '../../api/axios';

export default function ListenerSingleStory(){
    function displayTime(sec){
        let time = sec;
        const hours = Math.floor(sec / 3600);
        time -= (hours * 3600);
        
        const minutes = Math.floor(time / 60);
        const minInsert = (minutes < 10) ? "0" : "";
        time -= (minutes * 60);
        const seconds = time;
        const secInsert = (seconds < 10) ? "0" : "";

        const returnVal = hours ? `${hours}:${minInsert}${minutes}:${secInsert}${seconds}` :
        `${minInsert}${minutes}:${secInsert}${seconds}`;

        return returnVal;  
    }
    // const axP = useAxiosPrivate();
    // const nav = useNavigate();
    // const loc = useLocation();



    // const { title, rating, author, length, tags, to, _id } = fakeStories[1];
    //const [stories, setStories] = useState();
    
    const [story, setStory] = useState();
    const { story_id } = useParams();
    const time = story?.length ? displayTime(story.length) : 0;
    // useEventListener("load", (e)=>{
    //     console.log('it ran')
    //     getThenSet_public(setStory, 'getpublic/story', { _id: story_id });
    // })
    //* this fetches the story with story_id, and sets the story to the returned value :)
    // useMemo(() => getThenSet_public(setStories, 'getpublic/story'),[]);

    function fakeSetStory(value){
        console.log('fakeSetStory just logs the value ^_^: ')
        console.log(value);
    }
    useEffect(() => {
        getThenSet_public(setStory, 'getpublic/story', { _id: story_id });
    },[story_id]);
    console.log('rendering!', story_id)
    console.log(story);
    
    return(<div className="main">
        { story ? (<div>
             <div>The Player Goes here</div>
            <LinkListItem _id={ story._id } name="Rate this Story" to= "rating" />
            <div>
                { story ? (<div>
                    <div>Title: {story.title}, Runtime: { time }</div>
                    <div>Author: {story.author}, _id: {story._id}</div>
                    <div>
                        { story.description && <div>Description: { story.description } </div> } 
                    </div>
                </div>)
                : (<div>No story here!</div>)}

            </div>
            <RatingComponent readOnly={ true } state={ story.rating }/>
            <div className="flexWrapper mainItems">
                Tags:{' '}
                { story?.tags && story.tags.map((tag, i)=>{
                    return (<LinkListItem 
                        key={ i }
                        _id= { tag._id } 
                        to= 'tags' 
                        name= { tag.tag } 
                        classy="tags" 
                    />)
                })}
            </div>
            <ShareThisStory _id= { story._id } />
        </div>) : (<div>No Story Loaded!</div>) }
    </div>)
}

// {`tags/${tag}`}
// { story ? (<div></div>) : (<span></span>) }