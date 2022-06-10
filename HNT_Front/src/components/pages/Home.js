import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import useLogout from '../../hooks/useLogout';
import Listener from './listener/Listener';
import { Button, Icon } from '@mui/material';



// import { fakeStories } from '../../fakeApi/fakeStories';
import StoryItem from '../parts/StoryItem';
// import { DeleteForever } from '@mui/icons-material';
import '../../index.css';
import { getThenSet_private } from '../../hooks/useBackendRequest'

// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { AccessAlarm, ThreeDRotation, Forest as ForestIcon } from '@mui/icons-material';
const Home = () => {
    // const axP = useAxiosPrivate();
    // const loc = useLocation();
    // const nav = useNavigate();
    const axP = useAxiosPrivate();
    const navigate = useNavigate();
    const loc = useLocation();

    const logout = useLogout();
    const [stories, setStories] = useState([]);

    // const { story_id } = useParams();

    //* this should fetch all the stories ^_^
    useEffect(() => getThenSet_private(axP, navigate, loc, setStories, 'story'),[axP, loc, navigate]);

    // useEffect(()=>{
    //     //const url = _id ? `/${path}/${_id}` : `/${path}/`
    //     const url = 'story/';
    //     let isMounted = true;
    //     const controller = new AbortController();
    
    //     const getSomething = async () => {
    //         console.log('running getThenSet_private: ')
    //         try {
    //             console.log('trying again...')
    //             const response = await axiosPrivate.get('story/', { // ./users
    //                 signal: controller.signal
    //             });
    //             // const userNames = response.data.map(user => user.username); //grab usernames only. :)
    //             // console.log(response.data);
    //             // // console.log(userNames);
    //             isMounted && setStories(response.data) //if isMounted, then setUsers :D
    //             // console.log('stateVal is: ');
    //             // console.log(stateVal); //why undefined???
    //             //the parameter was response.data, but we didn't need to set/send all that :)
    //         }
    //         catch (err){
    //             console.log("I'm gonna log an error!")
    //             console.error(err);
    //             navigate('/login', { state: { from: location }, replace: true })
    //         }
    //     }
    //     getSomething();
    
    //     return () =>{ //* cleanup function ^_^
    //         isMounted = false;
    //         controller.abort();
    //     }
    // }, [])

    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        //setAuth({}); //* setAuth already being emptied in useLogout :)
        await logout(); //* this logout function deletes the cookie that holds the refresh token :)
        navigate('/homepublic');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Button variant="contained">Hello World</Button>
            <AccessAlarm />
            <ThreeDRotation />
            <ForestIcon />
            <Icon>Add circle</Icon>
            {/* <svg data-testid="AccessAlarm">Oh</svg>
            <svg data-testid="ThreeDRotation">NO!</svg> */}
            { stories && stories.map((story, index)=>{
                return (<StoryItem 
                    key= { index }
                    title={story.title} 
                    rating={story.rating}
                    author={story.author}
                    length={story.length} 
                    tags={story.tags}
                    to= '/listener'
                />)
            })}



            <Listener />
            Public
            <Link to="/homepublic">Go to homepublic</Link>
            <br />
            <Link to="/listener">Go to listener</Link>
            <br />
            Private
            <Link to="/editor">Go to the Editor page</Link>
            <br />
             <Link to="/creatorHomepage">Go to the Creator Home page</Link>
            <br />
            <Link to="/editCreatorProfile">Go to the editCreatorProfile page</Link>
            <br />

            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/creatorprofile">Go to Creator Profile</Link>
            <br />
            <Link to="/account">Go to Account</Link>
            <br />
            <Link to="/ad">Go to Ad</Link>
            <br />
            <Link to="/advertiser">Go to Advertiser</Link>
            <br />
            <Link to="/campaign">Go to Campaign</Link>

            <div className="flexGrow">
                <button onClick={ signOut }>Sign Out</button>
            </div>
        </section>
    )
}

export default Home;