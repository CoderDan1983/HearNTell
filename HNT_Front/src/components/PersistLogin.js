import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from '../hooks/useAuth';
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth(); //, persist
    const [ persist ] = useLocalStorage('persist', false);

    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken = async () =>{
            try {
                await refresh();
            }
            catch(err){
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        //* I added "&& persist" to avoid unwanted calls to verifyRefreshToken
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, []);

    useEffect(()=>{
        console.log(`isLoading is: ${isLoading}`);
        console.log(`aT is: ${JSON.stringify(auth?.accessToken)}`);
    },[isLoading]);

    return(
        <>
            { !persist ?
                <Outlet />
                : isLoading ?
                <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin;