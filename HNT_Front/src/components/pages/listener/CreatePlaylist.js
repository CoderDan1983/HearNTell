import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { post_formData } from '../../../hooks/useBackendRequest';
import '../../../index.css'
import { ModalContext } from '../../parts/ModalWrapper';
export default function CreatePlaylist(){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const { setOpen } = useContext(ModalContext);
    console.log('setOpen is: ', setOpen);
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    function submitFormHandler(e){
        e.preventDefault();

        const form = document.getElementById("playlistForm");
        const formData = form ? new FormData(form) : new FormData();

        console.log('formData is: ', logFormData(formData));

        //post_formData(axP, nav, loc, 'api/campaign', { payload: formData }); //options
    }
    return (<div className="modal">
        <div>Create Playlist</div>
        <form id="playlistForm">
            <div className="two">
                <label htmlFor="name">Name: </label>
                <input 
                    id="name" 
                    name="name" 
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


function logFormData(formData){
    let returnArray = [];
    for(const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
        returnArray.push({ key: pair[0], value: pair[1] })
    }
    return returnArray;
}

