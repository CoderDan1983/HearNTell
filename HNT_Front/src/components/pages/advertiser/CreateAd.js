import { useState} from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import '../../../index.css'
import { useContext } from 'react'; 
import { ModalContext } from '../../parts/ModalWrapper';

export default function CreateAd(props){
    const [name, setName] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const { setOpen } = useContext(ModalContext);
    const axiosPrivate = useAxiosPrivate();

    function submitFormHandler(e){
        e.preventDefault();

        let adData = {
            name: name, 
            audio_url: audioUrl, 
        };

        axiosPrivate.post('api/ad', adData)
        .then((ad)=>{
            //* Updates the ads on the Ad page.
            props.setter(ad.data);
        }); 
        setOpen(false); //close this "modal" :D
    };

    return(<div>
        <h1>Create Ad </h1>
        <form>
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