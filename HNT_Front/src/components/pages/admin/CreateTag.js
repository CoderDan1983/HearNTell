import { useState} from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import '../../../index.css'
import { useContext } from 'react'; 
import { ModalContext } from '../../parts/ModalWrapper';

export default function CreateTag(props){
    const [name, setName] = useState('');
    const { setOpen } = useContext(ModalContext);
    const axiosPrivate = useAxiosPrivate();

    function submitFormHandler(e){
        e.preventDefault();

        let tagData = {
            name: name, 
        };

        axiosPrivate.post('api/tag', tagData)
        .then((tag)=>{
            //* Updates the tags on the Tag page.
            props.setter(tag.data);
        }); 
        setOpen(false); //close this "modal" :D
    };

    return(<div>
        <h1>Create Tag </h1>
        <form>
            <label htmlFor="Name">Name of Tag: </label>
            <input 
                id="name" 
                name="name" 
                type="text"
                className="formData" 
                value = { name } 
                onChange={ (e) => setName(e.target.value) }
            />

            <button type="button" onClick = { (e) => setOpen(false) }>Cancel</button>
            <button type="button" onClick={submitFormHandler}>Create Tag</button>
        </form>
    </div>)
}