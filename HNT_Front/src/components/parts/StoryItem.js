import '../../index.css';
import { Link } from "react-router-dom";
import RatingComponent from './RatingComponent';

export default function StoryItem({ title, rating, author, length, tags, to, Ico }){
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
    
    return(<div className={ Ico ? "storyItemWithIcon" : "storyItem" }>    
        <Link to= { to }  className="link"> {/* no grid */}
            <div>
                <div className='storyItemTop' >
                    <span className="storyItemTitle">{title}</span> {/* no grid */}
                    <span className="storyItemAuthor"> {/* no grid */}
                        <RatingComponent readOnly={ true } rating={ rating} />
                    </span>
                    <span className="storyItemAuthor">{author}</span> {/* no grid */}
                    <span className="storyItemAuthor">{ displayTime(length) }</span> {/* no grid */}
                </div>
                <div className="storyItemTags"> {/* no grid */}
                    {tags.map((tag, i)=>{
                        return <span key={ i } >{tag}</span>
                    })}
                </div>            
            </div>
        </Link>
        { Ico && <Ico />}
    </div>)
}