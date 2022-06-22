import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from 'react';

import TagsInput from "../../parts/TagsInput";
import '../../../index.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import useAxios from '../../'
import RatingComponent from "../../parts/RatingComponent";
import '../../../index.css'
import { post_private } from '../../../hooks/useBackendRequest';
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
        privateSetting: false,
        violenceAppropriate: 0,
        sexuallyAppropriate: 0,
        languageAppropriate: 0,
        kidAppropriate: 0,
        audioLink: '',
        selectedFile: null,
        tags: [],
    });
    const [titleValue, setTitleValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('');
    const [privateSetting, setPrivateSetting] = useState(false);
    const [violenceAppropriate, setViolenceAppropriate] = useState(0);
    const [sexuallyAppropriate, setSexuallyAppropriate] = useState(0);
    const [languageAppropriate, setLanguageAppropriate] = useState(0);
    const [kidAppropriate, setKidAppropriate] = useState(0);
    const [audioLink, setAudioLink] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [tags, setTags] = useState([]);

    // const [violence, setViolence] = useState(0);
    console.log("selectedFile is: ", selectedFile);
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

    //* this totally works :D
    function createSetter(state, setter, { property, outerIndex } = {}){
        let newState; let oldEntry; let newEntry;
    
        return function(newValue){
            if(outerIndex !== undefined){ //* for an array
                newState = [...state ];
                oldEntry = newState[outerIndex];
                newState[outerIndex] = newValue;
            }
            else if(property !== undefined){ //* for an object 
                newState = { ...state }
                oldEntry = newState[property];
                newState[property] = newValue;
            }
            else{ //* if state is a "simple" variable that will hold only this array
                newState = newValue;
                oldEntry = state;
                newEntry = newValue;
            }
            setter(newState);
    
            return { newState, oldEntry, newEntry } 
        }
    }
    const violenceSetter = createSetter(formValue, setFormValue, { property: "violenceAppropriate" });

    function submitFormHandler(e){
        e.preventDefault();

        // const storyForm = document.getElementById("storyForm")
        // let storyData = {
        //     title: titleValue, description: descriptionValue, privateSetting: privateSetting,
        //     violenceAppropriate: violenceAppropriate, sexuallyAppropriate: sexuallyAppropriate,
        //     languageAppropriate: languageAppropriate, kidAppropriate: kidAppropriate,
        //     audioLink: audioLink, selectedFile: selectedFile, tags: tags,
        // }
        // const formData = new FormData();
        // const options = { headers: { "Content-Type" : "x-www-form-urlencoded" } }
        const options = { headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const form = document.getElementById("storyForm");
        const storyData = form ? new FormData(form) : new FormData();
        
        storyData.append("descriptionValue", "this is a test");
        // console.log('storyData title is: ', storyData.entries()); //get('title')

        console.log("lightning ---------------------")
        for(const pair of storyData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
          }
        // console.log('form is: ', form);
        // console.log('formRef.current is: ', formRef.current)
        // (axiosPrivate, navigate, location, path, { _id, payload } = {})=>{

        // const storyData { steve: "robbins" }
        console.log('submitFormHandler selectedFile is', selectedFile, typeof(selectedFile));
        post_private(axP, nav, loc, 'api/story', { payload: storyData, options }); //options
        // 
        // console.log('e was: ', e);
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
    const [violence, setViolence] = useState(0);
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
        <form onSubmit={ submitFormHandler } id="storyForm" ref= { formRef }>
            <label htmlFor="title">Title: </label>
            <input 
                id="title" 
                name="title" 
                type="text"
                className="formData" 
                value = { titleValue } 
                onChange={ (e) => setTitleValue(e.target.value) }
            />

            <label htmlFor="description">Description: </label>
            <textarea 
                id="description" 
                name="description" 
                className="formData"
                value = { descriptionValue } 
                onChange={ (e) => setDescriptionValue(e.target.value) }
            />

            <div>Choose up to ten tags (separated by commas):</div>
            <div className="flexWrapper">
                <TagsInput state= { tags } setter ={ setTags }/>
                {/* <TagsInput state= { arrayWithTags } setter ={ setArrayWithTags } outerIndex = { 2 }/> */}
                {/* <TagsInput state= { formValue } setter ={ setFormValue } property = "tags"/> */}
            </div>
            <div>
                <h2>Content Settings: </h2>
                <div>
                    <input 
                        id="privateSetting" 
                        name="privateSetting" 
                        type="checkbox"
                        value={ privateSetting }
                        onChange = { (e) => setPrivateSetting(e.target.checked) }
                    />
                    <label htmlFor="privateSetting">
                        Private - Only for Subscribers that I approve
                    </label> <br />
                    <div className="twoblack">
                        <div htmlFor="violenceAppropriate">
                            Violent Content
                        </div>
                        
                        {/* <RatingComponent readOnly={ false } rating={ violence } setRating = { setViolence }/> */}
                        <RatingComponent readOnly={ false } state={ formValue } setter = { setFormValue } property="violenceAppropriate" />
                        {/* setDisRating({state, setter, property}, value) */}
                        {/* <RatingComponent 
                            readOnly={ false } 
                            // rating={ violence } 
                            // setRating = { setViolence } 
                            rating={ formValue } 
                            setRating = { setFormValue } 
                            property = "violenceAppropriate"
                        /> */}
                    </div>
                    <input 
                        id="violenceAppropriate" 
                        name="violenceAppropriate" 
                        type="checkbox" 
                        value={ violenceAppropriate }
                        // onChange = { (e) => violenceSetter(e.target.checked) }
                        onChange = { (e) => setViolenceAppropriate(e.target.checked) }
                    />
                    <label htmlFor="violenceAppropriate">
                        Violent Content
                    </label><br />

                    <input 
                        id="sexuallyAppropriate" 
                        name="sexuallyAppropriate" 
                        type="checkbox" 
                        value={ sexuallyAppropriate }
                        onChange = { (e) => setSexuallyAppropriate(e.target.checked) }
                    />
                    <label htmlFor="sexuallyAppropriate">Sexually Explicit</label><br />

                    <input 
                        id="languageAppropriate" 
                        name="languageAppropriate" 
                        type="checkbox"
                        value={ languageAppropriate }
                        onChange = { (e) => setLanguageAppropriate(e.target.checked) }
                    />
                    <label htmlFor="languageAppropriate">
                        Language Warning
                    </label><br />

                    <input 
                        id="kidAppropriate" 
                        name="kidAppropriate" 
                        type="checkbox" 
                        value={ kidAppropriate }
                        onChange = { (e) => setKidAppropriate(e.target.checked) }
                    />

                    <label htmlFor="kidAppropriate">
                        Not suitable for Kids
                    </label>
                </div>
            </div>

            <div>
                <label>Upload an Audio Story</label>
                {/* <input type="file" onChange ={ (e) => setSelectedFile(e.target.value) }/><br /> */}
                <input type="file" onChange ={ (e) => setSelectedFile(e.target.files[0]) }/><br />

                <label htmlFor="audioLink">Link to Outside Audio</label>
                <input 
                    id="audioLink" 
                    name="audioLink"
                    type="text"
                    value={ audioLink }
                    onChange ={ (e) => setAudioLink(e.target.value) }
                />
            </div>

            <button>Submit</button>
        </form>
    </div>)
}