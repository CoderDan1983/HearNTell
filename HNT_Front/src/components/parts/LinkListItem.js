import { Link } from 'react-router-dom';
import '../../index.css';
import ListenerSingleStory from '../pages/listener/ListenerSingleStory';

export default function LinkListItem({ to, name, classy="link", Ico, _id }){
    // return(<Link to={ `${path}/${_id}/${path1}` }>
    const url = _id ? `${to}/${_id}` : to;
    // alert('url is: ', url);
    // console.log(_id, to);
    console.log(url);
    return(<div className={ Ico ? "storyItemWithIcon" : "storyItem" }>
        <Link to={ url }>
            <div className= { classy }>
                { name }
            </div>
        </Link>
        { Ico && <Ico /> }
    </div>)
}

