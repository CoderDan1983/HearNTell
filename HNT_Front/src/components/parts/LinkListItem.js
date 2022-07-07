import { Link } from 'react-router-dom';
import '../../index.css';
import ListenerSingleStory from '../pages/listener/ListenerSingleStory';
export default function LinkListItem({ to, name, classy="link", PreIco, Ico, _id }){
    // _id && alert("_id is: ", _id);
    console.log('reloading LinkListItem!', name, _id)
    // return(<Link to={ `${path}/${_id}/${path1}` }>
    const url = _id ? `${to}/${_id}` : to;
    // console.log('url is: ', url);
    // alert('url is: ', url);
    // console.log(_id, to);
    // console.log(url);
    return(<div className={ PreIco ? "storyItemWithPreIco" : "storyItem" }>
        { PreIco && <PreIco /> }
        <Link to={ url }>
            <div className= { classy }>
                { name }
            </div>
        </Link>
        { Ico && <Ico /> }
    </div>)
}

