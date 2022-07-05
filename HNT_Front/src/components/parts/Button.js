import { Link } from 'react-router-dom';
import '../../index.css';

export default function Button({ to, name, classy="button", _id }){
    const url = _id ? `${to}/${_id}` : to;
    return(
    <>
        <Link to={ url }>
            <div className= { classy }>
                { name }
            </div>
        </Link>
    </>)
}

