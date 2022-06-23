import { useState, useEffect } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../api/axios";
// import useRefreshToken from "../hooks/useRefreshToken";



const TagsAdmin = () => {
    const [ tags, setTags ] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getTags = async () => {
            console.log('Users.js, running getUsers: ')
            try {
                console.log('trying again...')
                const response = await axiosPrivate.get('/api/tag', { // ./users
                    signal: controller.signal
                });
                const tagNames = response.data.map(tag => tag.name); //grab usernames only. :)
                console.log(response.data);
                // console.log(userNames);
                isMounted && setTags(tagNames) //if isMounted, then setUsers :D
                console.log('the tagState is: ');
                console.log(TagsAdmin); //why undefined???
                //the parameter was response.data, but we didn't need to set/send all that :)
            }
            catch (err){
                console.log("I'm gonna log an error!")
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getTags();

        return () =>{ //* cleanup function ^_^
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Tags List</h2>
            {
                tags?.length ?
                (
                   <ul>
                        { tags.map((tag, i) => <li key={i}>{tag}</li>) }
                   </ul> 
                )
                : <p>No tags to display</p>
            }
            {/* <button onClick={ () => refresh() }>Refresh</button> 
            <br />*/
            //{ user?.username }
            }
        </article>
    )
}

export default TagsAdmin