import '../../index.css';
import { Link } from "react-router-dom";
import RatingComponent from './RatingComponent'; //* special
import BasicMenu from './BasicMenu';
// import { inputClasses } from '@mui/material';

// IcoArray = [
//     { Icon, clickHandler }
// ]
export default function StoryItem({ story, to, IcoArray, pre, menu }){
    const { title, tags, popularity_rating, author, duration,  } = story; //private //* unused: account_id, audio_url, description
    // const tags = story.tags.map((tag) => tag.tag);
    console.log('menu is: ', menu);
    return(<div className={ pre ? "storyItemWithPreIco" : "storyItem" }> 
        {/* { IcoArray && IcoArray.length && IcoArray.map((ico)=>{
            return ico.pre ? (<ico.Icon onClick= { ico.clickHandler && ico.clickHandler } />) : <div></div>;
        })} */}
        { pre && menu && <BasicMenu story= { story } menu = { menu } /> }
        <Link to= { to } className="link"> {/* no grid */}
            <div className='storyItemTop' >
                <span className="storyItemTitle">{title}</span> {/* no grid */}
                <span className="storyItemAuthor"> {/* no grid */}
                    <RatingComponent readOnly={ true } state ={ popularity_rating } />
                </span>
                <span className="storyItemAuthor">{author}</span> {/* no grid */}
                <span className="storyItemAuthor">{ showTime(duration) }</span> {/* no grid */}
            </div>
            <div className="storyItemTags"> {/* no grid */}
                {tags.map((tag, i)=>{
                    const displayVal = (i < tags.length - 1) ? `${tag}, ` : tag;
                    return <span key={ i } >{ displayVal }</span>
                })}
            </div>
        </Link>
        { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
            return (<ico.Icon key = { i } onClick= { ico.clickHandler && ico.clickHandler } />);
        })}
        { !pre && menu && <BasicMenu menu = { menu } /> }
    </div>)
}

//* helper function(s): :)
function showTime(sec){
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