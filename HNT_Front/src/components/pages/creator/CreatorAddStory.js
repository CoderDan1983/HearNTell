import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from 'react';

import TagsInput from "../../parts/TagsInput";
import '../../../index.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export default function CreatorAddStory(){
    const selectedTags = tags => { console.log(tags) };
    console.log('selectedTags is (10): ', selectedTags)
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    //let selectedTags = []; 
    const [tags, setTags] = useState([]); //$ example #0: array as regular state.
    const [arrayWithTags, setArrayWithTags] = useState([23, "susan", [], false]); //$ example #1: array into array.
    const [formValue, setFormValue] = useState({ //$ example #2: array into object.
        title: '',
        description: '',
        privateSetting: false,
        violenceAppropriate: false,
        sexuallyAppropriate: false,
        languageAppropriate: false,
        kidAppropriate: false,
        audioLink: '',
        selectedFile: null,
        tags: [],
    });
    
    function submitFormHandler(e){
        e.preventDefault();
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

    // function handleChanges(e, prop = "value"){
    //     ///e.preventDefault();
    //     console.log('handleChange', e.target[prop])
    //     setFormValue({
    //         ...formValue,
    //         [e.target.name]: e.target[prop],
    //     })
    // }

    console.log('on this render, the tags (tags set to state directly) are: ', tags);
    console.log('on this render (tag array from array) says: ', arrayWithTags);
    console.log('on this render (tag array from form object) says: ', formValue);

    // console.log('selectedTags is: ', selectedTags);
    return(<div>
        <h1>Create / Edit a Story </h1>
        <form onSubmit={ submitFormHandler }>
            <label htmlFor="title">Title: </label>
            <input 
                id="title" 
                name="title" 
                type="text" 
                value = { formValue.title } 
                onChange={ handleChange }
            />

            <label htmlFor="description">Description: </label>
            <textarea 
                id="description" 
                name="description" 
                value = { formValue.description } 
                onChange={ handleChange }
            />

            <div>Choose up to ten tags (separated by commas):</div>
            <div className="flexWrapper">
                {/* <TagsInput state= { tags } setter ={ setTags }/> */}
                {/* <TagsInput state= { arrayWithTags } setter ={ setArrayWithTags } outerIndex = { 2 }/> */}
                <TagsInput state= { formValue } setter ={ setFormValue } property = "tags"/>
            </div>
            <div>
                <h2>Content Settings: </h2>
                <div>
                    <input 
                        id="privateSetting" 
                        name="privateSetting" 
                        type="checkbox"
                        value={ formValue.privateSetting }
                        onChange = { handleCheckboxChange }
                    />
                    <label htmlFor="privateSetting">
                        Private - Only for Subscribers that I approve
                    </label> <br />
                    
                    <input 
                        id="violenceAppropriate" 
                        name="violenceAppropriate" 
                        type="checkbox" 
                        value={ formValue.violenceAppropriate }
                        onChange = { handleCheckboxChange }
                    />
                    <label htmlFor="violenceAppropriate">
                        Violent Content
                    </label><br />

                    <input 
                        id="sexuallyAppropriate" 
                        name="sexuallyAppropriate" 
                        type="checkbox" 
                        value={ formValue.sexuallyAppropriate }
                        onChange = { handleCheckboxChange }
                    />
                    <label htmlFor="sexuallyAppropriate">Sexually Explicit</label><br />

                    <input 
                        id="languageAppropriate" 
                        name="languageAppropriate" 
                        type="checkbox"
                        value={ formValue.languageAppropriate }
                        onChange = { handleCheckboxChange }
                    />
                    <label htmlFor="languageAppropriate">
                        Language Warning
                    </label><br />

                    <input 
                        id="kidAppropriate" 
                        name="kidAppropriate" 
                        type="checkbox" 
                        value={ formValue.kidAppropriate }
                        onChange = { handleCheckboxChange }
                    />
                    <label htmlFor="kidAppropriate">
                        Not suitable for Kids
                    </label>
                </div>
            </div>

            <div>
                <label>Upload an Audio Story</label>
                <input type="file" onChange={handleFileChange}/><br />

                <label htmlFor="audioLink">Link to Outside Audio</label>
                <input 
                    id="audioLink" 
                    name="audioLink"
                    type="text"
                    value={ formValue.audioLink}
                    onChange ={ handleChange }
                />
            </div>

            <button>Submit</button>
        </form>
    </div>)
}