import { useNavigate, Link } from "react-router-dom";
import useLogout from '../../hooks/useLogout';
import Listener from './listener/Listener';
import StoryItem from "../parts/StoryItem";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const fakeStories = [
        {
            title: "3 little pigs",
            rating: 4.2,
            author: "stephen king",
            length: 2493,
            tags: ["fairy tale", "allegory"]
        },
        {
            title: "boy who cried woof",
            rating: 3.7,
            author: "stephenie meyer",
            length: 99432,
            tags: ["fairy tale", "children", "terror"]
        }
    ]

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

            { fakeStories.map((story)=>{
                return (<StoryItem 
                    title={story.title} 
                    rating={story.rating}
                    author={story.author}
                    length={story.length} 
                    tags={story.tags}
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