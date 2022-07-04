
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import '../../../index.css'
import { post_private } from '../../../hooks/useBackendRequest';

export default function CreateAd(){

    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const formRef = useRef();

    const [name, setName] = useState('');
    const [audioUrl, setAudioUrl] = useState('')

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getAd = async () => {
            try {

                //todo get ad by id
                const response = await axiosPrivate.get('/api/ad/user', { // ./users
                    signal: controller.signal
                });
      
                isMounted && setName(response.data.name) && setAudioUrl(response.data.audioUrl) //if isMounted, then setUsers :D
            }
            catch (err){
                console.log("I'm gonna log an error!")
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getAd();

        return () =>{ //* cleanup function ^_^
            isMounted = false;
            controller.abort();
        }
    }, [])

    function submitFormHandler(e){
        e.preventDefault();

        let adData = {
            name: name, 
            audio_url: audioUrl, 
        }

        console.log(adData);

        post_private(axP, nav, loc, 'api/ad', { payload: adData }); 
        nav(`/ads`, { state: { from: loc }, replace: true });
        
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



            <button type="button" onClick={submitFormHandler}>Create Ad</button>
        </form>
    </div>)
}