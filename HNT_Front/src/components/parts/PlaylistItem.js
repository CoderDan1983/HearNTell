import LinkCapsule from './LinkCapsule';
import RatingComponent from './RatingComponent'; //* special
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

export default function PlaylistItem({ options = {}, to, IcoArray = [], menu, entry }){
    const { createdAt, updatedAt, user_id, description, story_ids, title, is_creator_list, creator } = entry; //private //* unused: account_id, audio_url, description
    const subscriptions = options.subscriptions ? options.subscriptions : [];
    const sub2This = subscriptions.filter((sub)=> ((sub.creator_id === entry.user_id)&&(sub.playlist_id === entry._id)));
    const subText = sub2This.length ? (sub2This[0].status === "approved" ? "subscribed" : "pending") : "";
    const author = (creator && creator.name) ? creator.name : "unknown";
    const PlaylistIcoArray = [{ //* adds playlist icon to any playlist! :)
        Icon: FeaturedPlayListIcon,
        pre: true,
    }, ...IcoArray];
    const opts = { wrapperClass: "playlistItemWithPre", ...options }

    console.log('17 subscriptions: ', subscriptions)
    console.log('17 sub2This: ', sub2This)
    console.log('17 sub2This.status: ', sub2This.status)
    console.log('17 subText: ', subText)

    return(<LinkCapsule to = { to } IcoArray = { PlaylistIcoArray } menu = { menu } 
    classy = "link" options = { opts } entry = { entry } >
        <>
            <div className='storyItemTop' >
                <span className="storyItemTitle">Title: {title}</span> {/* no grid */}
                <span className="storyItemAuthor">Author: {author}</span> {/* no grid */}
                <p className="storyItemAuthor">{ subText }</p>
                <span className="storyItemAuthor">Last Updated: { updatedAt }</span> {/* no grid */}
            </div>
            {/* <div className="storyItemTags">
                {tags.map((tag, i)=>{
                    const displayVal = (i < tags.length - 1) ? `${tag}, ` : tag;
                    return <span key={ i } >{ displayVal }</span>
                })}
            </div> */}
        </>
    </LinkCapsule>);
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




//* old version
// import '../../index.css';
// import { Link } from "react-router-dom";
// import RatingComponent from './RatingComponent'; //* special
// import BasicMenu from './BasicMenu';

// IcoArray = [
//     { Icon, clickHandler }
// ]

// export default function StoryItem({ to, IcoArray, menu, story, pre }){
//     const { title, tags, popularity_rating, author, duration,  } = story; //private //* unused: account_id, audio_url, description
//     // const tags = story.tags.map((tag) => tag.tag);
//     console.log('menu is: ', menu);
//     return(<div className={ pre ? "storyItemWithPreIco" : "storyItem" }> 
//         {/* { IcoArray && IcoArray.length && IcoArray.map((ico)=>{
//             return ico.pre ? (<ico.Icon onClick= { ico.clickHandler && ico.clickHandler } />) : <div></div>;
//         })} */}
//         { pre && menu && <BasicMenu story= { story } menu = { menu } /> }
//         <Link to= { to } className="link"> {/* no grid */}
//             <div className='storyItemTop' >
//                 <span className="storyItemTitle">{title}</span> {/* no grid */}
//                 <span className="storyItemAuthor"> {/* no grid */}
//                     <RatingComponent readOnly={ true } state ={ popularity_rating } />
//                 </span>
//                 <span className="storyItemAuthor">{author}</span> {/* no grid */}
//                 <span className="storyItemAuthor">{ showTime(duration) }</span> {/* no grid */}
//             </div>
//             <div className="storyItemTags"> {/* no grid */}
//                 {tags.map((tag, i)=>{
//                     const displayVal = (i < tags.length - 1) ? `${tag}, ` : tag;
//                     return <span key={ i } >{ displayVal }</span>
//                 })}
//             </div>
//         </Link>
//         { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
//             return (<ico.Icon key = { i } onClick= { ico.clickHandler && ico.clickHandler } />);
//         })}
//         { !pre && menu && <BasicMenu menu = { menu } /> }
//     </div>)
// }