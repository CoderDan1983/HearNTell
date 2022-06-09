//import { ThumbUpOffAltIcon, ThumbDownOffAltIcon, ThumbDownAltIcon, ThumbUpAltIcon } from '@mui/icons-material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
export default function ThumbTag({ tag, like, setLike, index }){
    function liker(event){
        let likeArray = JSON.parse(JSON.stringify(like));
        likeArray[index].like = !likeArray[index].like;
        //* this should cause a rerender in the parent, as like is being set to a new obj reference.
        setLike(likeArray);
    }
    return(<div className="tagLiker">
        <div>
            {tag}
        </div>
        { like ? <ThumbUpAltIcon onClick={ liker }/> : <ThumbUpOffAltIcon onClick={ liker } /> }
        { like ? <ThumbUpOffAltIcon  onClick={ liker }/> : <ThumbDownAltIcon  onClick={ liker } />}
    </div>)
}

/* <button className="btn">Submit My Rating</button> */