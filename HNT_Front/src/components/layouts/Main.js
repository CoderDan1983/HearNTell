import { Outlet } from 'react-router-dom';
import Navbar from './nav/Navbar';

const Layout = () =>{
    return(
        <main className="App">
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Layout;

//* the outlet component represents all the children of the layout component.