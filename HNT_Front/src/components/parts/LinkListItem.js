import { Link } from 'react-router-dom';
import '../../index.css';

export default function LinkListItem({ to, name, classy="link" }){
    // return(<Link to={ `${path}/${_id}/${path1}` }>
    return(<Link to={ to }>
        <div className= { classy }>
            { name }
        </div>
    </Link>)
}