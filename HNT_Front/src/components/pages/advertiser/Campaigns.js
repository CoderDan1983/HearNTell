import { useState, useEffect } from "react";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import { makeAddOneSetter, makeUpdateOneByIdSetter } from '../../../custom_modules_front/utility_front';
import CampaignListItem, {campaignListItem} from './CampaignListItem';


export default function Campaigns(){
    const [ campaigns, setCampaigns ] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const addACampaignSetter = makeAddOneSetter( campaigns, setCampaigns ); //* For use in CreateCampaign component
    const updateACampaignSetter = makeUpdateOneByIdSetter( campaigns, setCampaigns ); //* For use in EditCampaign component

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getCampaigns = async () => {
            try {
                const response = await axiosPrivate.get('/api/campaign/user', { // ./users
                    signal: controller.signal
                });
      
                isMounted && setCampaigns(response.data) //if isMounted, then setUsers :D
            }
            catch (err){
                console.log("I'm gonna log an error!")
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getCampaigns();
        

        return () =>{ //* cleanup function ^_^
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <>
            <h1 className="products">Campaign Page</h1>
            <h2 className="products">A list of advertiser's campaigns</h2>
            {
                campaigns?.length ?
                (
                    campaigns.map((campaign, i) => <CampaignListItem key={i} campaign={campaign}/> )
                )
                : <p>No campaigns to display</p>
            }
        </>
    )
}

