// This will just attach the axios interceptors to the instance :) 
// basically, it returns data and grabs a new accesstoken if the old one has expired :)
import { axiosFormPrivate } from "../api/axios";
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosFormPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(()=>{
        const requestIntercept = axiosFormPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']){ //add the authorization header if it does not exist.
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosFormPrivate.interceptors.response.use(
            response => response, // if there is no error, return the response
            async (error) => {
                const prevRequest = error?.config; //.config returns the previous request (info?)
                //if there error was a 'forbidden' status at we didn't just do this
                if(error?.response?.status === 403 && !prevRequest?.sent){ 
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosFormPrivate(prevRequest); //call the request again with this updated info :)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosFormPrivate.interceptors.request.eject(requestIntercept);
            axiosFormPrivate.interceptors.response.eject(responseIntercept); //remove this interceptor on cleanup ^_^.
        }
    },[auth, refresh]);

    return axiosFormPrivate;
}

export default useAxiosFormPrivate;