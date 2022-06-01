import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () =>{
    const { setAuth } = useAuth();

    const logout = async () =>{
        setAuth({});
        try{
            const response = await axios('/logout', {
                withCredentials: true, //this will sent the cookie back with the request :)
            });
        }
        catch(err){
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;