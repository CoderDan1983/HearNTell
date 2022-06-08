import { Link } from "react-router-dom"
import Users from '../../parts/Users';
import LinkListItem from "../../parts/LinkListItem";
import '../../../index.css'
const Admin = () => {
    return (
        <section>
            <h1>Admin Home Page</h1>
            <br />
            <Users />
            <br />
            <div className="flexWrapper">
                <LinkListItem to="/" name="manage tags" _id="0" />
                <LinkListItem to="/" name="manage users" _id="1" />
            </div>
            {/* <div className="flexGrow">
                <Link to="/">Home</Link>
                <Link to="/">Manange Tags</Link>
                <Link to="/">Manage Users</Link>
            </div> */}
        </section>
    )
}

export default Admin;