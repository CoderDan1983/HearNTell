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

////'RestrictedMember': 1354,