import useAuth from './useAuth';
import jwt_decode from "jwt-decode";

export const ROLES = { 
    'Member': 1984,
    'Advertiser': 1999,
    'Admin': 5150
}

export function useGetRoles(){
    const { auth } = useAuth();
    const decoded = auth?.accessToken ?
    jwt_decode(auth.accessToken)
    : undefined;
    const roles = decoded?.UserInfo?.roles || [];
    console.log('roles here are : ');
    console.log(roles);
    return { decoded, roles };
}
export function useGetUserInfo(){
    const { auth } = useAuth();
    const decoded = auth?.accessToken ?
    jwt_decode(auth.accessToken)
    : undefined;
    const userInfo = decoded?.UserInfo || [];
    console.log('info is : ');
    console.log(userInfo);
    return { decoded, userInfo };
}

////'RestrictedMember': 1354,