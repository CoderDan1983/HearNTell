import '../../index.css';
import { Link } from "react-router-dom";
export default function StoryItem({ title, rating, author, length, tags, to }){
    function displayTime(sec){
        let time = sec;
        const hours = Math.floor(sec / 3600);
        time -= (hours * 3600);

        const minutes = Math.floor(time / 60);
        time -= (minutes * 60);
        const seconds = time;

        const returnVal = hours ? `${hours}:${minutes}:${seconds}` :
        `${minutes}:${seconds}`;

        return returnVal;  
    }
    
    return(<Link to= { to } >
        <div className='storyItem'>
            <div className='storyItemTop' >
                <span className="storyItemTitle">{title}</span>
                <span className="storyItemAuthor">{rating}</span>
                <span className="storyItemAuthor">{author}</span>
                <span className="storyItemAuthor">{ displayTime(length) }</span>
            </div>
            <div className="storyItemTags">
                {tags.map((tag, i)=>{
                    return <span key={ i } >{tag}</span>
                })}
            </div>
        </div>
    </Link>)
}