import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => { //Version A: whether the user is logged in or not :D
    const { auth } = useAuth();

    const location = useLocation();

    const decoded = auth?.accessToken ?
    jwt_decode(auth.accessToken)
    : undefined;

    const roles = decoded?.UserInfo?.roles || [];

    return (
        roles.find(role => allowedRoles?.includes(role)) ?
            <Outlet />
            //: auth?.user ? //*changed from user to accessToken to persist login after refresh
            :auth?.accessToken ?
              <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;

//the replace tells us that we will actually change their history from /login to the place where they just came from :D
//without the "state={{ from: location }} replace" part of the code allows us to go back.  Otherwise, it would keep 
//taking us to the login page when we clicked back :)
