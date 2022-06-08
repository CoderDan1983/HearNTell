import { useState } from 'react';
import RatingComponent from "../../parts/RatingComponent";
import ThumbTag from '../../parts/ThumbTag';

export default function RatingModal({ story, defaultLikes = []}){ //* we should get access token for "user" :)
    const [genRating, setGenRating] = useState(0);
    const [violenceRating, setViolenceRating] = useState(0);
    const [sexRating, setSexRating] = useState(0);
    const [languageRating, setLanguageRating] = useState(0);
    const [unsuitableRating, setUnsuitableRating] = useState(0);

    if (defaultLikes.length === 0){ //* if no stored likes were passed in...
        for(let a=0; a < story.tags.length; a++){
            defaultLikes[a] = { tag: story.tags[a], like: undefined } ;
        }
    }

    const [tagLikes, setTagLikes] = useState(defaultLikes);

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
                    tag={ tag } 
                    like={ tagLikes } 
                    setLike = { setTagLikes } 
                    index= { i } 
                />)
            })}
        </div>
    </div>)
}