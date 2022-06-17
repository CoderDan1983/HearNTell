import { useState, useMemo, useEffect } from 'react';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getThenSet_private } from '../../../hooks/useBackendRequest';

import RatingComponent from "../../parts/RatingComponent";
import ThumbTag from '../../parts/ThumbTag';


export default function RatingModal(){ //* we should get access token for "user" :)
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const { story_id } = useParams();

    // const [likes, setLikes] = useState();
    const [story, setStory] = useState();
    const [genRating, setGenRating] = useState(0);
    const [violenceRating, setViolenceRating] = useState(0);
    const [sexRating, setSexRating] = useState(0);
    const [languageRating, setLanguageRating] = useState(0);
    const [unsuitableRating, setUnsuitableRating] = useState(0);

    console.log('ratingModal render! story_id is: ', story_id)
    useEffect(() => {
        getThenSet_private(axP, nav, loc, setStory, 'story', { _id: story_id });
        //getThenSet_private(axP, nav, loc, setLikes, 'rating/likes', { _id: story_id });
        //getThenSet_private(axP, nav, loc, setPlaylists, 'playlist', { _id: user_id });
        // getThenSet_private(axP, nav, loc, setQueue, 'queue', { _id: user_id });
        console.log('listener should be loaded this render :) ');
    },[axP, nav, loc, story_id]);

    // if (defaultLikes.length === 0){ //* if no stored likes were passed in...
    //     for(let a=0; a < story.tags.length; a++){
    //         defaultLikes[a] = { tag: story.tags[a], like: undefined } ;
    //     }
    // }

    // const [tagLikes, setTagLikes] = useState(defaultLikes);

    return(<div className="main">
        <div>
            <h3>How much did you enjoy this story?</h3>
            <RatingComponent readOnly={ false } rating={ genRating } setRating={ setGenRating }/>
        </div>
        <div>
            <h3>Age Appropriateness: </h3>
            <div>
                <h3>Violence: </h3>
                <RatingComponent 
                    readOnly={ false } 
                    rating={ violenceRating } 
                    setRating={ setViolenceRating }
                />
            </div>
            <div>
                <h3>Sexual Content</h3>
                <RatingComponent 
                    readOnly={ false } 
                    rating={ sexRating } 
                    setRating={ setSexRating }
                />
            </div>
            <div>
                <h3>Language</h3>
                <RatingComponent 
                    readOnly={ false } 
                    rating={ languageRating } 
                    setRating={ setLanguageRating }
                />
            </div>
            <div>
                <h3>Unsuitable for Children</h3>
                <RatingComponent 
                    readOnly={ false } 
                    rating={ unsuitableRating } 
                    setRating={ setUnsuitableRating }
                />
            </div>
        </div>
        <div>
            <h3>Do these tags fit?</h3>
            { story?.tags && story.tags.map((tag, i)=>{
                return (<ThumbTag 
                    tag={ tag.tag } 
                    like={ tag.likes } 
                    setLike = { tag.dislikes } 
                    index= { i } 
                />)
            })}
        </div>
    </div>)
}