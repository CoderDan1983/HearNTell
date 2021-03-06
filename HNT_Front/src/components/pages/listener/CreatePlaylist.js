import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { post_formData, logFormData } from '../../../hooks/useBackendRequest';

import '../../../index.css'
import { ModalContext } from '../../parts/ModalWrapper';
export default function CreatePlaylist({ setter, is_creator_list }){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const { setOpen } = useContext(ModalContext);
    console.log('setOpen is: ', setOpen);
    // const [ name, setName ] = useState('')
    // const [ description, setDescription ] = useState('')
    function submitFormHandler(e){
        e.preventDefault();

        const form = document.getElementById("playlistForm");
        const formData = form ? new FormData(form) : new FormData();
        formData.append("is_creator_list", is_creator_list);

        console.log('formData is: ', logFormData(formData));

        post_formData(axP, nav, loc, 'api/playlist', { payload: formData, setter: setter }); //options
        setOpen(false); //close this "modal" :D
    }
    return (<div className="modal">
        <div>Create Playlist</div>
        <form id="playlistForm">
            <div className="two">
                <label htmlFor="title">Title: </label>
                <input 
                    id="title" 
                    name="title" 
                />
            </div>
            <div className="two">
                <label htmlFor="description">Description: </label>
                <textarea id="description" name="description" />
            </div>
            <div className="two">
                <button type="button" onClick = { (e) => setOpen(false) }>Cancel</button>
                <button type="button" onClick = { submitFormHandler }>Create</button>
            </div>
        </form>
    </div>)
}

