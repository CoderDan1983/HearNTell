import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';

import axios from '../../api/axios';
const LOGIN_URL = '/auth'; //* matched in his node.js course :)
const Login = () => {
    const { setAuth } = useAuth(); //, persist, setPersist 
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    //* get where they came from.  But if we can't find the pathname,
    //* give it the default of "/"

    const userRef = useRef(); //* we'll use this to focus on an element when page loads.
    const errRef = useRef(); //* to connect error to element reference :)

    //# const [user, setUser] = useLocalStorage('user', ''); //useState('');
    const [user, resetUser, userAttribs] = useInput('user', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    //# const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    }, []);

    useEffect(()=>{
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user, pwd); //* we could use these lines to make a pretend back end response (?)

        try {
            const response = await axios.post(LOGIN_URL, //* this url is auto attached to the base url from axios.js
                JSON.stringify({ user, pwd }), //* the "payload"
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    //credentials: 'include' //stack overflow advice #2
                }
            );
            console.log(JSON.stringify(response?.data)); //* ?.  -- this is known as option chaining :)
            //console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;

            // setAuth({ user, pwd, roles, accessToken });
            setAuth({ user, accessToken }); //* we don't need to keep track of the password here.
            //* setAuth would hold it for a long time anyway.  PS:  roles aready in the access token 
            //* so they don't need to be sent seperately ^_^
            resetUser();
            setPwd('');
            //# setSuccess(true);
            navigate(from, { replace: true });
        }
        catch(err){
            // if(!err.response){
            if(!err?.response){ //* if there is no error.response / it's falsy!
                setErrMsg('No Server Response!');
            }
            else if(err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            }
            else if(err.response?.status === 401){
                setErrMsg('Unauthorized');
            }
            else{
                setErrMsg('Login Failed'); 
            }
            errRef.current.focus();
        }
    }

    //# const togglePersist = ()=> {
    //     setPersist(prev => !prev);
    // }
    // useEffect(()=>{
    //     localStorage.setItem("persist", persist);
    // }, [persist]);
    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    //# onChange={ (e)=> setUser(e.target.value) }
                    //# value={user} //* this makes this a controlled input
                    { ...userAttribs }
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={ (e)=> setPwd(e.target.value) }
                    value={pwd} //* this makes this a controlled input
                    required
                />
                
                <button>Sign In</button>
                <div>Can you see me?</div>
                <div className="persistCheck">
                    <input 
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck} //# togglePersist
                        checked={check} //# persist
                    />
                    <label htmlFor="persist">Trust ThisDevice?</label>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up </Link>
                </span>
            </p>
        </section>
    )
}

export default Login;