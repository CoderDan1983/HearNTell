import { ROLES } from '../../../hooks/useRoles';

export const navButtons = [
    {
        to: "/homepublic",
        name: "Homie",
        req: ["loggedOut"],
        hasDropdown: false,
    },
    {
        to: "/",
        name: "Home",
        req: ["loggedIn"],
        hasDropdown: false,
    },
    {
        to: "/listener",
        name: "Listen",
        req: ["loggedIn"],
        hasDropdown: true,
    },
    {
        to: "/creatorHomepage",
        name: "Content Creator",
        req: ["loggedIn"],
        hasDropdown: false,
    },
    {
        to: "/account",
        name: "Account",
        req: ["loggedIn"],
        hasDropdown: false,
    },
    {
        to: "/advertiser",
        name: "Advertiser",
        req: [ ROLES.Advertiser, ROLES.Member ], //todo need to remove member role after testing.
        hasDropdown: false,
    },
    {
        to: "/admin",
        name: "Admin",
        req: [ROLES.Admin],
        hasDropdown: false,
    },
    {
        to: "/register",
        name: "Sign Up",
        req: ["loggedOut"],
        hasDropdown: false,
    },
    {
        to: "/login",
        name: "Login",
        req: ["loggedOut"],
        hasDropdown: false,
    },
]

export const MenuItems = [
    {
        title: 'Marketing',
        path: '/marketing',
        cName: 'hasDropdown-link'
    },
    {
        title: 'Consulting',
        path: '/consulting',
        cName: 'hasDropdown-link'
    },
        {
        title: 'Design',
        path: '/design',
        cName: 'hasDropdown-link'
    },
    {
        title: 'Development',
        path: '/development',
        cName: 'hasDropdown-link'
    },
]