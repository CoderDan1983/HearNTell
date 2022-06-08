import { Link } from 'react-router-dom';
import '../../index.css';

export default function LinkListItem({ to, name }){
    return(<Link to={ to }>
        <div className="link">
            { name }
        </div>
    </Link>)
}