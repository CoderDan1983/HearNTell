import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import defaultImage from './user-icon.png';
// import '../../../../'
import { createSetter } from '../../../custom_modules_front/utility_front';
import { post_formData, get_private, logFormData } from '../../../hooks/useBackendRequest';
import '../../../index.css';
// import axios from '../../../api/axios';
const PROFILE_URL = '/creator/profile'; 
const SERVER_URL = "http://localhost:3500";
// const PROFILE_URL = '/creator/updateCreatorProfile'; 
// '../../../../public/user-icon.png'

// import TagsInput from "../../parts/TagsInput";
// import useAxios from '../../'
// import RatingComponent from "../../parts/RatingComponent";


// {     nameDef="Lon", aboutMeDef = "sup?", imageUrlDef = "./user-icon.png"    }

export default function CreatorHomepage(){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();

    const formRef = useRef();
    const errRef = useRef();

    const params = useParams();
    console.log("CreatorHomepage.  params are: ", params);
    const { creator_id } = params;
    const [ profile, setProfile ] = useState({about_me: "", image_file: "" });
    const [ creator, setCreator ] = useState({ name: "" })
    // const nameSetter = createSetter(form, setForm, { property: "name" });
    const [name, setName] = useState("");
    const aboutMeSetter = createSetter(profile, setProfile, { property: "about_me" });
    const imageFileSetter = createSetter(profile, setProfile, { property: "image_file" });
    const nameSetter = createSetter(creator, setCreator, { property: "name" });

    const [errMsg, setErrMsg] = useState('');
    // const [name, setName] = useState();
    // const [about_me, setAboutMe] = useState();
    //*grab image from here and not input on submission?
    // const [image_file, setImageUrl] = useState(""); 

    const [shownImage, setShownImage] = useState();
    
    //console.log('rendered: ', name, about_me, shownImage, image_file);
    function setProfileAndCreator(obj){
        const image_name = obj?.image_name;

        image_name && setShownImage(`${SERVER_URL}/images/${image_name}`); //URL.createObjectURL(data)
        obj && setProfile(obj);
        obj && obj["creator"] && obj["creator"]["name"] && nameSetter(obj["creator"]["name"])
    }
    useEffect(()=>{     
        get_private(axP, nav, loc, `creator/profile/${ creator_id }`, { setter: setProfileAndCreator });
    },[axP, nav, loc, creator_id]);

    console.log('profile is: ', profile, ', creator is: ', creator);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const auth = useAuth;
        // const accessToken0 = auth?.accessToken;

        const form = document.getElementById("profileForm");
        const profileData = form ? new FormData(form) : new FormData();
        console.log('profileData is: ', logFormData(profileData));
        const goTo = '/';
        post_formData(axP, nav, loc, 'creator/profile', { payload: profileData }); //goTo

    //     try {
    //         const response = await axios.post(PROFILE_URL, //* this url is auto attached to the base url from axios.js
    //             JSON.stringify({ name, about_me, image_file, accessToken: accessToken0 }), //* the "payload"
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true,
    //                 //credentials: 'include' //stack overflow advice #2
    //             }
    //         );
    //         console.log(JSON.stringify(response?.data)); //* ?.  -- this is known as option chaining :)
    //         //console.log(JSON.stringify(response));

    //         const accessToken = response?.data?.accessToken;

    //         setName('');
    //         setAboutMe('');
    //         setImageUrl('')
    //         //# setSuccess(true);
            
    //         //navigate(from, { replace: true });
    //     }
    //     catch(err){
    //         // if(!err.response){
    //         if(!err?.response){ //* if there is no error.response / it's falsy!
    //             setErrMsg('No Server Response!');
    //         }
    //         else if(err.response?.status === 400){
    //             setErrMsg('Missing Username or Password');
    //         }
    //         else if(err.response?.status === 401){
    //             setErrMsg('Unauthorized');
    //         }
    //         else{
    //             setErrMsg('Login Failed'); 
    //         }
    //         errRef.current.focus();
    //     }
    }

    function updateImageFile(e) { //* updates shown and 
        console.log('updateImageFile.  file is: ', e.target.files[0])
        setShownImage(URL.createObjectURL(e.target.files[0]));
        imageFileSetter(URL.createObjectURL(e.target.files[0]));
        //setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    return(
        // public/images/img-4.jpg    http://localhost:3500/public
        <>
            {/* <img alt="testing" src="../../../images/user-icon.png" /> */}
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="home">Edit Profile</h1>
            {/* <img id="profilePicEmpty" alt="creator profile" src="http://localhost:3500/images/img-4.jpg"  width="350" height="500" />
            <img id="profilePicEmpty" alt="creator profile" src="https://news.uoguelph.ca/wp-content/uploads/2016/11/cat-e1478099247797.jpg"  width="350" height="500" /> */}
            <form onSubmit={ handleSubmit } id="profileForm" >
                <label htmlFor="name">
                    <input 
                        id="name" value={ creator["name"] } name="name"
                        onChange={ (e) => nameSetter(e.target.value) }
                    />
                </label>

                <label htmlFor="about_me">About Me: </label>
                <textarea 
                    id="about_me" value={ profile["about_me"] } name="about_me"
                    onChange={ (e) => aboutMeSetter(e.target.value) }
                />

                {/* { shownImage && <img id="profilePic" alt="creator profile" src={ shownImage } width="350" height="500" /> } */}
                <img id="profilePic" alt="creator profile" src={ shownImage ? shownImage : defaultImage } width="350" height="500" />             
                
                <label htmlFor="profilePicUpload">Upload Profile Image</label>
                <input 
                    type="file" id="profilePicUpload" name="image_file"
                    onChange={ updateImageFile }
                />

                <button>Update</button>
            </form>
        </>
    )
}






//# old code :)
// import { useState, useRef } from 'react';
// import useAuth from '../../../hooks/useAuth';
// import axios from '../../../api/axios';
// // const PROFILE_URL = '/creator/updateCreatorProfile'; 
// const PROFILE_URL = '/creator/profile'; 
//     // '../../../../public/user-icon.png'

// export default function CreatorHomepage({ 
//     nameDef="Lon", aboutMeDef = "sup?", imageUrlDef = "./user-icon.png"    
// }){
//     const errRef = useRef();
//     const [errMsg, setErrMsg] = useState('');
//     const [name, setName] = useState(nameDef);
//     const [about_me, setAboutMe] = useState(aboutMeDef);
//     //*grab image from here and not input on submission?
//     const [image_file, setImageUrl] = useState(""); 
//     const [shownImage, setShownImage] = useState(imageUrlDef);

//     //console.log('rendered: ', name, about_me, shownImage, image_file);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const auth = useAuth;
//         const accessToken0 = auth?.accessToken;
            
//         try {
//             const response = await axios.post(PROFILE_URL, //* this url is auto attached to the base url from axios.js
//                 JSON.stringify({ name, about_me, image_file, accessToken: accessToken0 }), //* the "payload"
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true,
//                     //credentials: 'include' //stack overflow advice #2
//                 }
//             );
//             console.log(JSON.stringify(response?.data)); //* ?.  -- this is known as option chaining :)
//             //console.log(JSON.stringify(response));

//             const accessToken = response?.data?.accessToken;

//             setName('');
//             setAboutMe('');
//             setImageUrl('')
//             //# setSuccess(true);
            
//             //navigate(from, { replace: true });
//         }
//         catch(err){
//             // if(!err.response){
//             if(!err?.response){ //* if there is no error.response / it's falsy!
//                 setErrMsg('No Server Response!');
//             }
//             else if(err.response?.status === 400){
//                 setErrMsg('Missing Username or Password');
//             }
//             else if(err.response?.status === 401){
//                 setErrMsg('Unauthorized');
//             }
//             else{
//                 setErrMsg('Login Failed'); 
//             }
//             errRef.current.focus();
//         }
//     }

//     function updateImageFile(e) { //* updates shown and image_file
//         setShownImage(URL.createObjectURL(e.target.files[0]))
//         setImageUrl(URL.createObjectURL(e.target.files[0]));
//     }

//     return(
//         <>
//             <p ref={errRef} className={errMsg ? "errmsg" : 
//             "offscreen"} aria-live="assertive">{errMsg}</p>
//             <h1 className="home">Edit Profile</h1>
//             <form onSubmit={ handleSubmit }>
//                 <label htmlFor="name">
//                     <input 
//                         id="name" value={ name } 
//                         onChange={ (e) => setName(e.target.value) }
//                     />
//                 </label>

//                 <label htmlFor="about_me">About Me: </label>
//                 <textarea 
//                     id="about_me" value={ about_me }
//                     onChange={ (e) => setAboutMe(e.target.value) }
//                 />

//                 <img id="profilePic" alt="creator profile" src={ shownImage } />
//                 <label htmlFor="profilePicUpload">Upload Profile Image</label>
//                 <input 
//                     type="file" id="profilePicUpload"
//                     onChange={ updateImageFile }
//                 />

//                 <button>Update</button>
//             </form>
//         </>
//     )
// }