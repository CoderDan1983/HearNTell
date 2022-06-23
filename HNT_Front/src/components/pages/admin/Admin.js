import { Link } from "react-router-dom"
import Users from '../../parts/Users';
import TagsAdmin from '../../parts/TagsAdmin';
import LinkListItem from "../../parts/LinkListItem";
import '../../../index.css';
const Admin = () => {
    return (
        <section>
            <h1>Admin Home Page</h1>
            <br />
            <Users />
            <br />
            <TagsAdmin />
          
        </section>
    )
}

export default Admin;
