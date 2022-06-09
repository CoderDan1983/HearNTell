import { Link } from 'react-router-dom';
import '../../index.css';
import ListenerSingleStory from '../pages/listener/ListenerSingleStory';

export default function LinkListItem({ to, name, classy="link", Ico, _id }){
    // return(<Link to={ `${path}/${_id}/${path1}` }>
    return(<div className={ Ico ? "storyItemWithIcon" : "storyItem" }>
        <Link to={ _id ? `${to}/${_id}` : to }>
            <div className= { classy }>
                { name }
            </div>
        </Link>
        { Ico && <Ico /> }
    </div>)
}