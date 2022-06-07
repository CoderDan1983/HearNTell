
import { Link } from "react-router-dom"
import StoryItem from '../parts/StoryItem';
import { fakeStories } from '../fakeApi/fakeStories';
// import { Grid, Item } from '@mui/material';
import '../../index.css';
const HomePublic = () => {
    return (<div>
        <h1>Hear n Tell</h1>
        <div>A place for people to share stories</div>
        <h2>Top Stories this Week:</h2>
        <div className="storyContainer">
            { fakeStories.map((story, i)=>{
                return (<StoryItem 
                    key={ i }
                    title={ story.title}
                    rating= {story.rating}
                    author={story.author}
                    length={story.length}
                    tags={story.tags}
                    to={ story.to}
                />)
            })}
        </div>
        

    </div>)
}

export default HomePublic;

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