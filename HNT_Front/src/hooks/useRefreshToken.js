import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken 
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;



// import axios from '../api/axios';
// import useAuth from './useAuth';

// //* this function/mod (?) is called when the initial request fails :)
// const useRefreshToken = () => {
//     const { setAuth } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('/refresh', {
//             withCredentials: true //allows us to send that secure cookie :)
//         });
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.accessToken);
//             return { ...prev, accessToken: response.data.accessToken };
//         });
//         console.log('line 16, logging accessToken');
//         console.log(response.data.accessToken);
//         return response.data.accessToken; //uses accessToken for request :)
//         //* it will retry the request with this token :)
//     }
//     return refresh; //not calling refresh, but returning it at this point
// };

// export default useRefreshToken;