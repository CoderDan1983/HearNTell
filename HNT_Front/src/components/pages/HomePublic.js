// import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from 'react';
import { getThenSet_public } from '../../hooks/useBackendRequest';

import StoryItem from '../parts/StoryItem';
import SearchComponent from '../parts/SearchComponent';
import { fakeStories, fakeStories1, fakeTags, fakeSearches, loadStoriesByTag } from '../fakeApi/fakeStories';

// import { Grid, Item } from '@mui/material';
import '../../index.css';
export default function HomePublic(){
    // const axP = useAxiosPrivate();
    // const nav = useNavigate();
    // const loc = useLocation();

    const [stories, setStories] = useState([]);

    // const { story_id } = useParams();

    //* this fetches the story with story_id, and sets the story to the returned value :)
    useMemo(() => getThenSet_public(setStories, 'getpublic/story'),[]);

    // console.log('fakeSearches is: ');
    // console.log(fakeSearches);
    // const [stories, setStories] = useState(fakeStories)

    return (<div className="main">
        <h1 className="mainItems center">Hear n Tell</h1>
        <div className="mainItems center">A place for people to share stories</div>
        <div>
            <div className="flexWrapper mainItems center">
                <h2>Top Stories this Week:</h2>
                <SearchComponent options={ fakeSearches }/>
            </div>
            {/* <div className="flexWrapper mainItems">
                { stories && stories.map((story, i)=>{
                    //lolz, it doesn't matter what tags you pass in.  It loads the same anywayz ^_^
                    const tags = story.tags.map((tag)=> tag.tag);
                    return(
                        // <div key={i}>Hey</div>
                        <div key={i} className="tag"  onClick={ (e)=> loadStoriesByTag(tags, setStories) }>
                            { story.name }
                        </div>
                    )
                })}
            </div> */}
            <div className="storyContainer mainItems">
                { stories && stories.map((story, i)=>{
                    const tags = story.tags.map((tag)=> tag.tag);
                    return (<StoryItem 
                        key={ i }
                        title={ story.title}
                        rating= {story.rating}
                        author={story.author}
                        length={story.length}
                        tags={ tags }
                        to= '/listener'
                    />)
                })}
            </div>
        </div>



    </div>)
}

{/* <div className="container" >
    <div className="row">
        <div className="col-md-8">
            This is a column 8 wide
        </div>
        <div className="col-md-4">
            This is a column with 4 wide.
        </div>
    </div>
</div> */}
{/* <Grid container spacing={2}>
    <Grid item xs={2}>
        <Item>xs=2</Item>
    </Grid>
    <Grid item xs={4}>
        <Item>xs=4</Item>
    </Grid>
    <Grid item xs={6}>
        <Item>xs=6</Item>
    </Grid>
</Grid> */}
{/* <section>
<h1>Links</h1>
<br />
<h2>Public</h2>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
<Link to="/listener">Listener</Link>
<br />
<h2>Private</h2>
<Link to="/">Home</Link>
<Link to="/editor">Editors Page</Link>
<Link to="/admin">Admin Page</Link>
</section> */}