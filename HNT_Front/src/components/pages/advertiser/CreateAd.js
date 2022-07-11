
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from 'react';
// import Form from "./Form";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import useAxios from '../../'
import '../../../index.css'
import { post_private } from '../../../hooks/useBackendRequest';

import { useContext } from 'react'; 
import { ModalContext } from '../../parts/ModalWrapper';

export default function CreateAd(){

    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const formRef = useRef();

    const [name, setName] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const { setOpen } = useContext(ModalContext);
    function submitFormHandler(e){
        e.preventDefault();

        let adData = {
            name: name, 
            audio_url: audioUrl, 
        }

        console.log(adData);

        post_private(axP, nav, loc, 'api/ad', { payload: adData }); 
        // nav(`/ads`, { state: { from: loc }, replace: true });
        setOpen(false); //close this "modal" :D
        
    }



    return(<div>
        <h1>Create Ad </h1>
        <form id="campaignForm" ref= { formRef }>
            <label htmlFor="Name">Name of Ad: </label>
            <input 
                id="name" 
                name="name" 
                type="text"
                className="formData" 
                value = { name } 
                onChange={ (e) => setName(e.target.value) }
            />

            <label htmlFor="ad_url">Ad URL </label>
            <input
                id="ad_url" 
                name="ad_url"
                type="text"
                className="formData"
                value = { audioUrl } 
                onChange={ (e) => setAudioUrl(e.target.value) }
            />
            <button type="button" onClick = { (e) => setOpen(false) }>Cancel</button>
            <button type="button" onClick={submitFormHandler}>Create Ad</button>
        </form>
    </div>)
}