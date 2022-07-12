import { useState, useEffect } from "react";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import EditAd from './EditAd';
import CreateAd from './CreateAd';
import ModalWrapper from "../../parts/ModalWrapper";
import { makeAddOneSetter, makeUpdateOneByIdSetter } from '../../../custom_modules_front/utility_front';

function AdPage(){
    const [ ads, setAds ] = useState();
    const addAnAdSetter = makeAddOneSetter( ads, setAds ); //* For use in CreateAd component
    const updateAnAdSetter = makeUpdateOneByIdSetter( ads, setAds ); //* For use in EditAd component
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

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

    //* Remove ad and refreash the Ad state.
    const removeAd = async (e) => {
        e.preventDefault();
        const ad_id = e.target.dataset.id;
        const deleted_ad = await axiosPrivate.delete(`/api/ad/${ad_id}`, { 
        });
        const newAds = ads.filter((ad) => ad._id !== deleted_ad.data._id);
        setAds(newAds);
    }

    return(
        <>
            <h1 className="services">Ads Page</h1>
            <h2 className="services">A list of advertiser's Ads</h2>
            <ModalWrapper buttonTitle="Create Ad">
                <CreateAd setter={addAnAdSetter}/>
            </ModalWrapper>
            {
                ads?.length ?
                (
                   <ul>
                        { ads.map((ad, i) => <li key={i}>{ad.name}             
                            <ModalWrapper buttonTitle="Edit">
                                <EditAd ad_id={ad._id} setter={updateAnAdSetter}/>
                            </ModalWrapper>
                        <button data-id={ad._id} onClick={removeAd}>Remove</button></li>) }
                   </ul> 
                )
                : <p>No ads to display</p>
            }
        </>
    )
}





export default AdPage;


