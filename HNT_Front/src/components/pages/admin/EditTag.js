import { useState, useEffect, } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import '../../../index.css'
import { useContext } from 'react'; 
import { ModalContext } from '../../parts/ModalWrapper';

export default function EditTag(props){
    console.log('got to EditTag.  These are the props: ', props)
    const axiosPrivate = useAxiosPrivate();
    const [name, setName] = useState('');
    const tag_id = props._id;

    //* Load the initial ad data into the form.
    useEffect(()=>{
        const fetchData = async () => {
            const url = "api/tag/" + tag_id;
            const response = await axiosPrivate.get(url);
            console.log("tag from backend", response.data);
            setName(response.data.name);
        }
        fetchData()
        .catch(console.error);
    },[]);


    const { setOpen } = useContext(ModalContext);
    function submitFormHandler(e){
        e.preventDefault();

        let tagData = {
            _id: tag_id,
            name: name, 
        }

        const url = "api/tag/" + tag_id;
        axiosPrivate.post(url, tagData)
        .then((tag)=>{
            props.setter(tag.data);
        }); 
        setOpen(false); //close this "modal" :D
    }


    return(<div>
        <h1>Edit Tag </h1>
        <form >
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
            <button type="button" onClick={submitFormHandler}>Update Tag</button>
        </form>
    </div>)
}