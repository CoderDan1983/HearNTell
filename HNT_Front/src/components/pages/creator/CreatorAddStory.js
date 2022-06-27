import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import TagsInput from "../../parts/TagsInput";
import '../../../index.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import useAxios from '../../'
import RatingComponent from "../../parts/RatingComponent";
import '../../../index.css'
import { post_formData, get_private } from '../../../hooks/useBackendRequest';
export default function CreatorAddStory(){
    const selectedTags = tags => { console.log(tags) };
    console.log('selectedTags is (10): ', selectedTags)
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const formRef = useRef();
    //let selectedTags = []; 
    // const [tags, setTags] = useState([]); //* example #0: array as regular state.
    // const [arrayWithTags, setArrayWithTags] = useState([23, "susan", [], false]); //* example #1: array into array.

    const [formValue, setFormValue] = useState({ //* example #2: array into object.
        title: '',
        description: '',
        isPrivate: false,
        violenceRating: 0,
        sexRating: 0,
        languageRating: 0,
        generalRating: 0,
        audioLink: '',
        selectedFile: null,
        tags: [],
    });
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [violenceRating, setViolenceRating] = useState(0);
    const [sexRating, setSexRating] = useState(0);
    const [languageRating, setLanguageRating] = useState(0);
    const [generalRating, setGeneralRating] = useState(0);
    const [audioLink, setAudioLink] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [tags, setTags] = useState([]);

    const [ playlists, setPlaylists ] = useState([]);
    const [ playlist, setPlaylist ] = useState("");
    
    // const [violence, setViolence] = useState(0);
    // console.log("selectedFile is: ", selectedFile);
    console.log("playlist is: ", playlist);
    console.log("playlists is: ", playlists);

    useEffect(()=>{
        get_private(axP, nav, loc, 'playlist/user', { setter: setPlaylists });
    },[axP, nav, loc]);
    // // function setDisRating(state, setter, property, value){
    // //     let newState = state;
    // //     newState[property] = value;
    // //     setter(newState);
    // // }
    // function createRatingSetter(state, setter, property){ //value
    //     return function(value){
    //         let newState = state;
    //         newState[property] = value;
    //         setter(newState);
    //     }
    // }


    // const violenceSetter = createSetter(formValue, setFormValue, { property: "violenceRating" });

    function submitFormHandler(e){
        e.preventDefault();
        
        // const formData = new FormData();
        // const options = { headers: { "Content-Type" : "application/x-www-form-urlencoded" } }

        // const options = { 
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }
        let problem = "";
        if ((title === "") && (problem === "")) problem = "title";
        if (((audioLink === "")&&(selectedFile === null)) && (problem === "")) problem = "selectedFile";
        if ((playlist === "") && (problem === "")) problem = "playlist";
        
        if(problem){
            alert(`${problem} has been left blank.  Please fill out before submission!`)
        }
        else{
            const form = document.getElementById("storyForm");
            const storyData = form ? new FormData(form) : new FormData();
            storyData.append("tags", JSON.stringify(tags));
            storyData.append("file", selectedFile);
            storyData.append("violenceRating", violenceRating);
            storyData.append("sexRating", sexRating);
            storyData.append("languageRating", languageRating);
            storyData.append("generalRating", generalRating);
            const grabbedTags = storyData.get('tags');
            console.log('in storyData, tags are: ', grabbedTags, typeof(grabbedTags));
            // console.log('storyData title is: ', storyData.entries()); //get('title')

            console.log("lightning! ---------------------")

            // console.log('storyData loop end. -----')
            // console.log('form is: ', form);
            // console.log('formRef.current is: ', formRef.current)
            // (axiosPrivate, navigate, location, path, { _id, payload } = {})=>{

            // const storyData { steve: "robbins" }
            // console.log('submitFormHandler selectedFile is', selectedFile, typeof(selectedFile));
            post_formData(axP, nav, loc, 'api/story', { payload: storyData }); //options
        }
    }
    // getThenSet_private(axP, nav, loc, setQueue, 'queue', { _id: user_id });
    function handleCheckboxChange(e){
        ///e.preventDefault();
        // console.log('handleCheckboxChange', e.target.checked)
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.checked,
        })
    }

    function handleChange(e){
        ///e.preventDefault();
        // console.log('handleChange', e.target.value)
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        })
    }

    function handleFileChange(e) {
        setFormValue({
            ...formValue,
            selectedFile: e.target.files[0],
        })
    }
    // const [violence, setViolence] = useState(0);
    // function handleChanges(e, prop = "value"){
    //     ///e.preventDefault();
    //     console.log('handleChange', e.target[prop])
    //     setFormValue({
    //         ...formValue,
    //         [e.target.name]: e.target[prop],
    //     })
    // }

    // console.log('on this render, the tags (tags set to state directly) are: ', tags);
    // console.log('on this render (tag array from array) says: ', arrayWithTags);
    console.log('on this render (tag array from form object) says: ', formValue);

    // console.log('selectedTags is: ', selectedTags);
    return(<div>
        <h1>Create / Edit a Story </h1>
        <form id="storyForm" ref= { formRef }>
            <label htmlFor="title">Title: </label>
            <input 
                id="title" 
                name="title" 
                type="text"
                className="formData" 
                value = { title } 
                onChange={ (e) => setTitle(e.target.value) }
            />

            <label htmlFor="description">Description: </label>
            <textarea 
                id="description" 
                name="description" 
                className="formData"
                value = { description } 
                onChange={ (e) => setDescription(e.target.value) }
            />

            <div>Choose up to ten tags (separated by commas):</div>
            <div className="flexWrapper">
                <TagsInput state= { tags } setter ={ setTags } />
                {/* <TagsInput state= { arrayWithTags } setter ={ setArrayWithTags } outerIndex = { 2 }/> */}
                {/* <TagsInput state= { formValue } setter ={ setFormValue } property = "tags"/> */}
            </div>
            <div>
                <h2>Content Settings: </h2>
                <div className="twoblack">
                    <input 
                        id="isPrivate" 
                        name="isPrivate" 
                        type="checkbox"
                        value={ isPrivate }
                        onChange = { (e) => setIsPrivate(e.target.checked) }
                    />
                    <label htmlFor="isPrivate">
                        Private - Only for Subscribers that I approve
                    </label> <br />

                    <RatingComponent readOnly={ false } state={ violenceRating } setter = { setViolenceRating } />
                    <label htmlFor="violenceRating">
                        Violent Content
                    </label><br />

                    <RatingComponent readOnly={ false } state={ sexRating } setter = { setSexRating } />
                    <label htmlFor="sexRating">Sexually Explicit</label><br />

                    <RatingComponent readOnly={ false } state={ languageRating } setter = { setLanguageRating } />
                    <label htmlFor="languageRating">
                        Language Warning
                    </label><br />

                    <RatingComponent readOnly={ false } state={ generalRating } setter = { setGeneralRating } />
                    <label htmlFor="generalRating">
                        Not suitable for Kids
                    </label>
                </div>
            </div>

            <div>
                <label>Upload an Audio Story</label>
                <input type="file" onChange ={ (e) => {
                    console.log('setting selectedFile to: ', e.target.files[0])
                    setSelectedFile(e.target.files[0]); 
                }}/><br />

                <label htmlFor="audioLink">Link to Outside Audio</label>
                <input 
                    id="audioLink" 
                    name="audioLink"
                    type="text"
                    value={ audioLink }
                    onChange ={ (e) => setAudioLink(e.target.value) }
                />
            </div>

            <div>
                <label htmlFor="playlist_id">Story Goes In: </label>
                <select 
                    id="playlist_id" 
                    name="playlist_id"
                    value={ playlist } 
                    onChange={ (e) => setPlaylist(e.target.value) }
                >
                    <option value="" disabled hidden> ---------- </option>
                    { playlists.length && playlists.map((playlist, i)=>{
                        return <option value= { playlist._id } key={i}>{ playlist.title }</option>
                    })}
                </select>
            </div>

            <button type="button" onClick={ submitFormHandler } >Submit</button>
        </form>
    </div>)
}


{/* <div className="twoblack">
<div htmlFor="violenceRating">
    Violent Content
</div>
<RatingComponent readOnly={ false } state={ formValue } setter = { setFormValue } />
<RatingComponent readOnly={ false } rating={ violence } setRating = { setViolence }/>

setDisRating({state, setter, property}, value)
<RatingComponent 
    readOnly={ false } 
    // rating={ violence } 
    // setRating = { setViolence } 
    rating={ formValue } 
    setRating = { setFormValue } 
    property = "violenceRating"
/>
</div> */}