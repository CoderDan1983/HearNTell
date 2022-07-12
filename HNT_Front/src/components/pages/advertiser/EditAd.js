import { useState, useEffect, } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import '../../../index.css'
import { useContext } from 'react'; 
import { ModalContext } from '../../parts/ModalWrapper';

export default function EditAd(props){

    const axiosPrivate = useAxiosPrivate();
    const [name, setName] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const ad_id = props.ad_id;

    //* Load the initial ad data into the form.
    useEffect(()=>{
        const fetchData = async () => {
            const url = "api/ad/" + ad_id;
            const response = await axiosPrivate.get(url);
            setAudioUrl(response.data.audio_url);
            setName(response.data.name);

        }
        fetchData()
        .catch(console.error);
    },[]);


    const { setOpen } = useContext(ModalContext);
    function submitFormHandler(e){
        e.preventDefault();

        let adData = {
            _id: ad_id,
            name: name, 
            audio_url: audioUrl, 
        }

        const url = "api/ad/" + ad_id;
        axiosPrivate.post(url, adData)
        .then((ad)=>{
            props.setter(ad.data);
        }); 
        setOpen(false); //close this "modal" :D
    }


    return(<div>
        <h1>Edit Ad </h1>
        <p>{ad_id}</p>
        <form id="campaignForm" >
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
            <button type="button" onClick={submitFormHandler}>Update Ad</button>
        </form>
    </div>)
}