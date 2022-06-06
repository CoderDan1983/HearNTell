import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'; //* basically, we'll have access to this code, so to speak.
import { Button } from './Button';
import Dropdown from './Dropdown';
import { navButtons } from './navInfo';
import NavItem from './NavItem';
import { useGetRoles } from '../../../hooks/useRoles';


export default function Nav(){
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const { decoded, roles } = useGetRoles();

    const onMouseEnter = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        }
        else{
            setDropdown(true);
        }
    };
    const onMouseLeave = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        }
        else{
            setDropdown(false);
        }
    };

    const events = {
        onMouseEnter, onMouseLeave, closeMobileMenu
    }

    const navItems = navButtons.filter((item)=>{   
        for(let r=0; r < item.req.length; r++){
            if((decoded === undefined)&&(item.req[r] === "loggedOut")){ //If we are logged out
                console.log("loggedOut found for " + item.name);
                return true;
            }
            else { //logged in.
                if(item.req[r] === "loggedIn"){ //If we just need to be logged in.
                    console.log("loggedIn found for " + item.name);
                    return true;
                }
                if(roles.includes(item.req[r])){ //if we have a specific match
                    console.log(item.req[r] + " found for " + item.name)
                    return true;
                }
            }
        }
        console.log('line 125 for ' + item.name + "!")
        return false;
    });

    console.log('navItem is: ');
    console.log(navItems);

    return(
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    EPIC <i className='fab fa-firstdraft' />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    { navItems.map((item, index)=>{
                        return (<NavItem 
                            key = { index } 
                            to={ item.to } 
                            name={ item.name } 
                            events={ events } 
                            hasDropdown = { item.hasDropdown }
                            dropdown={ dropdown }
                        />)
                    })}
                </ul>
                <Button />
            </nav>
        </>
    )
}