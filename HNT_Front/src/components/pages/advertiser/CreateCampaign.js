import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import TagsInput from "../../parts/TagsInput";
import '../../../index.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export default function CreateCampaign(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState('');
    const [ad_id, setAdId] = useState('');
    const [ads, setAds] = useState([]); //* A list of ads to link to campaign.
    const [maximumBid, setMaximumBid] = useState('');
    const [budget, setBudget] = useState('');
    const [targetAudienceAll, setTargetAudienceAll] = useState(true);
    const [campaignActive, setCampaignActive] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getAds = async () => {
            try {
                const response = await axiosPrivate.get('/api/ad/user', { // ./users
                    signal: controller.signal
                });
      
                isMounted && setAds(response.data) //if isMounted, then 
            }
            catch (err){
                console.log("I'm gonna log an error!")
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getAds();

        return () =>{ //* cleanup function ^_^
            isMounted = false;
            controller.abort();
        }
    }, [])

    function submitFormHandler(e){
        e.preventDefault();

        let campaignData = {
            name: name, 
            ad_id: ad_id, 
            maximumBid: maximumBid,
            budget: budget, 
            targetAudienceAll: targetAudienceAll,
            campaignActive: campaignActive, 
            tags: tags,

        }
        axiosPrivate.post('api/campaign', campaignData)
        .then(()=> {
            navigate('/campaigns', { state: { from: location }, replace: true });
        })
    };

    return(<div>
        <h1>Create a Campaign </h1>
        <form >
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
            <select onChange={ (e) => setAdId(e.target.value)}>
            {ads.map(ad => (
              <option key={ad._id} value={ad._id}>
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