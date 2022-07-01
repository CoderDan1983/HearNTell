import { useState, useEffect } from "react";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../parts/Button";

function AdPage(){
    const [ ads, setAds ] = useState();
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
      
                isMounted && setAds(response.data) //if isMounted, then setUsers :D
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

    const removeAd = async (e) => {
        e.preventDefault();
        const ad_id = e.target.dataset.id;
        const deleted_ad = await axiosPrivate.delete(`/api/ad/${ad_id}`, { 
        });
        console.log(deleted_ad.data._id);
        const newAds = ads.filter((ad) => ad._id !== deleted_ad.data._id);
        console.log(newAds);
        setAds(newAds);
    }

    return(
        <>
            <h1 className="services">Ads Page</h1>
            <h2 className="services">A list of advertiser's Ads</h2>
            <Button name="Create Ad" to="/createAd" />
            {
                ads?.length ?
                (
                   <ul>
                        { ads.map((ad, i) => <li key={i}>{ad.name} <button data-id={ad._id} onClick={removeAd}>Remove</button></li>) }
                   </ul> 
                )
                : <p>No ads to display</p>
            }
        </>
    )
}





export default AdPage;


