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
import { get_private, lumpDig } from '../../hooks/useBackendRequest'

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

    // let obj1 = {
    //     little: {
    //         house: { 
    //             on: {
    //                 the: {
    //                     praire: "yep."
    //                 }
    //             }
    //         }
    //     }
    // }
    // console.log('testing digLump: ', lumpDig(obj1, ["little", "house", "on"]));

    // let arry0 = ["a", "hit", "without", "missing"];
    // let arry1 = ["miss", arry0, "miss", "miss"];
    // let arry2 = [arry1, "miss", "miss", "miss"];
    // let arry3 = ["miss", "miss", "miss", arry2];
    // let arry4 = ["miss", arry3, "miss", "miss"];
    // console.log('testing digLump: ', lumpDig(arry4, [1, 3, 0, 1]));

    // let mixedObj = [
    //     {
    //         john: "stewart",
    //         chipmunks: [
    //             {
    //                 name: "alvin",
    //                 age: 13,
    //                 studies: false,
    //             },
    //             {
    //                 name: "simon",
    //                 age: 9,
    //                 studies: true,
    //             },
    //             {
    //                 name: "theodore",
    //                 age: 89382384282,
    //                 studies: false,
    //             },
    //         ]
    //     },
    //     {
    //         john: "conner"
    //     }
    // ];


// console.log('testing digLump: ', lumpDig(mixedObj, [0, "chipmunks", 0, "name"]));

    const { story_id } = useParams();

    //* this should fetch all the stories ^_^

    useEffect(() => {
        const queries = { sortBy: "age", desc: true, limit: 10 }
        get_private(axP, navigate, loc, 'story', { setter: setStories, queries })
    },
    [axP, loc, navigate]);

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
                // const tags = story.tags.map((tag) => tag.tag);
                // console.log('tags: ');
                // console.log(tags);
                return (<StoryItem 
                    story = { story }
                    key= { index }
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