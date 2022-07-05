import { useState, useRef } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
// const PROFILE_URL = '/creator/updateCreatorProfile'; 
const PROFILE_URL = '/creator/profile'; 
    // '../../../../public/user-icon.png'

export default function CreatorHomepage({ 
    nameDef="Lon", aboutMeDef = "sup?", imageUrlDef = "./user-icon.png"    
}){
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [name, setName] = useState(nameDef);
    const [aboutMe, setAboutMe] = useState(aboutMeDef);
    //*grab image from here and not input on submission?
    const [imageUrl, setImageUrl] = useState(""); 
    const [shownImage, setShownImage] = useState(imageUrlDef);

    //console.log('rendered: ', name, aboutMe, shownImage, imageUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = useAuth;
        const accessToken0 = auth?.accessToken;
            
        try {
            const response = await axios.post(PROFILE_URL, //* this url is auto attached to the base url from axios.js
                JSON.stringify({ name, aboutMe, imageUrl, accessToken: accessToken0 }), //* the "payload"
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    //credentials: 'include' //stack overflow advice #2
                }
            );
            console.log(JSON.stringify(response?.data)); //* ?.  -- this is known as option chaining :)
            //console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;

            setName('');
            setAboutMe('');
            setImageUrl('')
            //# setSuccess(true);
            
            //navigate(from, { replace: true });
        }
        catch(err){
            // if(!err.response){
            if(!err?.response){ //* if there is no error.response / it's falsy!
                setErrMsg('No Server Response!');
            }
            else if(err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            }
            else if(err.response?.status === 401){
                setErrMsg('Unauthorized');
            }
            else{
                setErrMsg('Login Failed'); 
            }
            errRef.current.focus();
        }
    }

    function updateImageFile(e) { //* updates shown and imageUrl
        setShownImage(URL.createObjectURL(e.target.files[0]))
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    return(
        <>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="home">Edit Profile</h1>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="name">
                    <input 
                        id="name" value={ name } 
                        onChange={ (e) => setName(e.target.value) }
                    />
                </label>

                <label htmlFor="aboutMe">About Me: </label>
                <textarea 
                    id="aboutMe" value={ aboutMe }
                    onChange={ (e) => setAboutMe(e.target.value) }
                />

                <img id="profilePic" alt="creator profile" src={ shownImage } />
                <label htmlFor="profilePicUpload">Upload Profile Image</label>
                <input 
                    type="file" id="profilePicUpload"
                    onChange={ updateImageFile }
                />

                <button>Update</button>
            </form>
        </>
    )
}

