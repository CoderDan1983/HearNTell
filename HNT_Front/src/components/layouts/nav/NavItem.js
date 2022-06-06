import './Navbar.css'; //* basically, we'll have access to this code, so to speak.
import Dropdown from './Dropdown';

import { Link } from 'react-router-dom';

const NavItem = ({ to, name, events, hasDropdown, dropdown }) => {
  return (
    <li className='nav-item'>
        <Link to={ to } className="nav-links" onClick={ events.closeMobileMenu }>
            { name }
        </Link>
        { hasDropdown && dropdown && <Dropdown />}
    </li>
  )
}

export default NavItem;