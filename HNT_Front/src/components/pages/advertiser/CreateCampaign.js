//todo copy and pasted from create story. Under construction.

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from 'react';

import TagsInput from "../../parts/TagsInput";
import '../../../index.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import useAxios from '../../'
import '../../../index.css'
import { post_private } from '../../../hooks/useBackendRequest';

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
    const [campaignActive, setCampaignActive] = useState(false);
    const [tags, setTags] = useState([]);


    function submitFormHandler(e){
        e.preventDefault();

        // const storyForm = document.getElementById("storyForm")
        let campaignData = {
            name: name, 
            ad: ad, 
            maximumBid: maximumBid,
            budget: budget, 
            targetAudienceAll: targetAudienceAll,
            campaignActive: campaignActive, 
            tags: tags,

        }
        // const formData = new FormData();
        // const options = { headers: { "Content-Type" : "x-www-form-urlencoded" } }
        // const options = { headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // }
        console.log(campaignData);

        post_private(axP, nav, loc, 'api/campaign', { payload: campaignData }); //options
    }



    return(<div>
        <h1>Create a Campaign </h1>
        <form id="campaignForm" ref= { formRef }>
            <label htmlFor="Name">Name of Campaign: </label>
            <input 
                id="name" 
                name="name" 
                type="text"
                className="formData" 
                value = { name } 
                onChange={ (e) => setName(e.target.value) }
            />

            <label htmlFor="ad">Select Ad: </label>
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
            <p>Set maximum bid here. You will only be charged for the price that wins the bid for that tag.</p>
            <label htmlFor="budget">Budget: </label>
            <input
                id="budget" 
                name="budget"
                type="text"
                className="formData"
                value = { budget } 
                onChange={ (e) => setBudget(e.target.value) }
            />
            <br />
            <div>Choose up to ten tags:</div>
            <div className="flexWrapper">
                <TagsInput state= { tags } setter ={ setTags }/>
            </div>
            <div>
            <br />
              <input 
                  id="campaignActive" 
                  name="campaignActive" 
                  type="checkbox"
                  value={ campaignActive }
                  onChange = { (e) => setCampaignActive(e.target.checked) }
              />
             
              <label htmlFor="campaignActive">
                  Activate Campaign
              </label> <br />

            </div>

            <button type="button" onClick={submitFormHandler}>Submit</button>
        </form>
    </div>)
}