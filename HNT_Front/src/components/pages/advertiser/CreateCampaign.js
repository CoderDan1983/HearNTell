//todo copy and pasted from create story. Under construction.

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from 'react';

import TagsInput from "../../parts/TagsInput";
import '../../../index.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import useAxios from '../../'
import '../../../index.css'
import { post_private } from '../../../hooks/useBackendRequest';
import { faL } from "@fortawesome/free-solid-svg-icons";

const fake = require("../../fakeApi/fakeAds_Back") //todo Replae with real api feed after testing.
export default function CreateCampaign(){
    // const selectedTags = tags => { console.log(tags) };
    // console.log('selectedTags is (10): ', selectedTags)
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const formRef = useRef();

    const [name, setName] = useState('');
    const [ad, setAd] = useState('')
    const [maximumBid, setMaximumBid] = useState('');
    const [budget, setBudget] = useState('');
    const [targetAudienceAll, setTargetAudienceAll] = useState(true);
    const [tags, setTags] = useState([]);
    const [campaignActive, setCampaignActive] = useState(false);


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



        // post_private(axP, nav, loc, 'api/story', { payload: storyData, options }); //options

    }



    return(<div>
        <h1>Create a Campaign </h1>
        <form onSubmit={ submitFormHandler } id="campaignForm" ref= { formRef }>
            <label htmlFor="Name">Name: </label>
            <input 
                id="name" 
                name="name" 
                type="text"
                className="formData" 
                value = { name } 
                onChange={ (e) => setName(e.target.value) }
            />
            <select onChange={ (e) => setAd(e.target.value)}>
            {fake.fakeAds.map(ad => (
              <option key={ad._id} value={ad}>
                {ad.name}
              </option>
            ))}
            </select>

            <label htmlFor="maximum_bid">Maximum Bid: </label>
            <input
                id="maximum_bid" 
                name="maximum_bid"
                type="text"
                className="formData"
                value = { maximumBid } 
                onChange={ (e) => setMaximumBid(e.target.value) }
            />
            <label htmlFor="budget">Budget: </label>
            <input
                id="budget" 
                name="budget"
                type="text"
                className="formData"
                value = { budget } 
                onChange={ (e) => setBudget(e.target.value) }
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
                        id="campaignActive" 
                        name="campaignActive" 
                        type="checkbox"
                        value={ campaignActive }
                        onChange = { (e) => setCampaignActive(e.target.checked) }
                    />
                    <label htmlFor="privateSetting">
                        Private - Only for Subscribers that I approve
                    </label> <br />

                </div>
            </div>

            <button>Submit</button>
        </form>
    </div>)
}