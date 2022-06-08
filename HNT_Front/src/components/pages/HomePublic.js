
import { Link } from "react-router-dom"

const HomePublic = () => {
    return (<div>
        <h1>Hear n Tell</h1>
        <div>A place for people to share stories</div>
        <h2>Top Stories this Week:</h2>

        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    This is an 8 wide column
                </div>
                <div className="col-md-4">
                    This is a 4 wide column.
                </div>
            </div>
        </div>
        
    </div>)
}

export default HomePublic;


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