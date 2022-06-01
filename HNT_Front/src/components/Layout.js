import { Outlet } from 'react-router-dom';

const Layout = () =>{
    return(
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout;

//* the outlet component represents all the children of the layout component.