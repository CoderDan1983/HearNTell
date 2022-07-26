import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { get_private } from '../../hooks/useBackendRequest';
import { storyMenu, playlistsMenu } from '../../hooks/useMenus';
// import useAuth from "../../hooks/useAuth";
import { useGetRoles, useGetUserInfo } from '../../hooks/useRoles'

import '../../index.css';

import SearchComponent from "./SearchComponent"
import StoryItem from './StoryItem';
import PlaylistItem from './PlaylistItem';
import ProfileItem from './ProfileItem';
import { ElectricScooterRounded } from '@mui/icons-material';

export default function SearchInterface({ options, playlists, goTo, subscriptions }){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const [ searched, setSearched ] = useState(false);
    const [ search, setSearch ] = useState("");
    // const [ options, setOptions ] = useState("");
    const [ results, setResults ] = useState({});
    const [shownResults, setShownResults] = useState([]);

    const [ viewReturnOptions, setViewReturnOptions ] = useState(false);
    const [ returnAll , setReturnAll ] = useState(true);
    const [ returnStories , setReturnStories ] = useState(true);
    const [ returnProfiles , setReturnProfiles ] = useState(true);
    const [ returnPlaylists , setReturnPlaylists ] = useState(true);
    // const [ returnDescriptions , setReturnDescriptions ] = useState(true);

    const [ sections, setSections ] = useState(1);
    const [ sectionStart, setSectionStart ] = useState(0);
    const [ sectionSize, setSectionSize ] = useState(2);
    console.log('sections is; ', sections);

    const [ style, setStyle ] = useState("all");

    useEffect(()=>{
        runSearch()
    }, [style])
    console.log('start', '------------>');
    // console.log('results are: ', results);
    // console.log('searched is: ', searched);
    // console.log('style is: ', style);
    console.log('shownResults is: ', shownResults);
    console.log('end', '.................');

    const { userInfo } = useGetUserInfo();
    const user_id = userInfo ? userInfo.user_id : "";
    console.log('user_id is: ', user_id);

    const playlistSubscriptions = subscriptions.filter((sub)=> sub.playlist_id);
    //# const creatorSubscriptions = subscriptions.filter((sub)=> !sub.playlist_id);
    
    const forPlaylistsMenu = { nav, loc, axP, goTo };
    const forStoryMenu = { nav, loc, axP, goTo };

    function displayResults(results, changes = {}){
        const { r_pro, r_play, r_st, sectz } = changes;
        // console.log('changes are : ', changes);
        const { stories, profiles, playlists, search_string } = results; //* note: some of these may be undefined :)
        let displayArr = [];
        const returnTheProfiles = (r_pro !== undefined) ? r_pro : returnProfiles;
        const returnThePlaylists = (r_play !== undefined) ? r_play : returnPlaylists;
        const returnTheStories = (r_st !== undefined) ? r_st : returnStories;
        const show_sects = (sectz !== undefined) ? sectz : sections;

        console.log(returnTheProfiles, returnThePlaylists, returnTheStories)

        if(profiles && profiles.length && returnTheProfiles) displayArr = displayArr.concat(profiles);
        if(playlists && playlists.length && returnThePlaylists) displayArr = displayArr.concat(playlists);
        if(stories && stories.length && returnTheStories) displayArr = displayArr.concat(stories);

        //* get precision total and sort by it (in descending order ^_^)
        displayArr.forEach((entry)=> entry.precision.total = objTotal(entry.precision));
        sortBy(displayArr, "precision", "total", true);

        const end = sectionStart + show_sects * sectionSize;
        const sliver =  displayArr.slice(sectionStart, end)

        setShownResults(sliver);
    }

    function returnOptions(style){
        const returnAll = document.getElementById("returnAll");
        const returnProfiles = document.getElementById("returnProfiles");
        const returnPlaylists = document.getElementById("returnPlaylists");
        const returnStories = document.getElementById("returnStories");

        function hideIfDisabled(name, addition, classy){
            const group = document.getElementsByName(name);
            for(let g=0; g < group.length; g++){
                const id = group[g].id;
                const wrapper = document.getElementById(`${id}${addition}`)
                if (group[g].disabled) wrapper.className = "hide";
                else wrapper.className = classy;
            }
        }
        switch(style){
            case "tags":
                returnAll.disabled = true;
                returnProfiles.disabled = true;
                returnPlaylists.disabled = true;
                returnStories.disabled = false;
            break;

            case "description":
                returnAll.disabled = true;
                returnProfiles.disabled = true;
                returnPlaylists.disabled = true;
                returnStories.disabled = false;
            break;

            case "title":
                returnAll.disabled = false;
                returnProfiles.disabled = true;
                returnPlaylists.disabled = false;
                returnStories.disabled = false;
            break;
            
            case "author":
                returnAll.disabled = false;
                returnProfiles.disabled = false;
                returnPlaylists.disabled = false;
                returnStories.disabled = false;
            break;
            
            case "all":
            default:
                returnAll.disabled = false;
                returnProfiles.disabled = false;
                returnPlaylists.disabled = false;
                returnStories.disabled = false;
            break;
        }
        hideIfDisabled("returnCheck", "_wrapper", "")
    }

    function prepareDisplayResults(e, results, style){
        
        //@ this changes how the buttons are displayed relative to focus :)
        if(e){ //* NOTE:  this only runs if an event is passed in here, so to speak :)
            const searchButtons = document.getElementsByName("searchButton");
            setStyle(e.target.value);
            returnOptions(e.target.value);
            searchButtons.forEach((btn) => { 
                btn.className = "blurred"
                if(e.target === btn){
                    btn.className = "focused";
                }
            });
        }

        //@ load the results of what should be displayed into the displayArr!
        displayResults(results);
    }

    function undefIs0(value){
        return (value === undefined) ? 0 : value;
    }

    function objTotal(obj){ //* similar to .reduce for an array :D
        let total = 0;
        for(let prop in obj){
            total += obj[prop];
        }
        return total;
    }

    function sortBy(array, prop, prop1, desc = true){
        if(Array.isArray(array)){
            console.log('sortBy is preparing to sort!')
            if(prop1 === "all"){
                if(desc) return array.sort((a,b)=> objTotal(b[prop]) - objTotal(a[prop]))
                else return array.sort((a,b)=> objTotal(a[prop]) - objTotal(b[prop]))
            }
            if(desc) return array.sort((a,b)=> undefIs0(b[prop][prop1]) - undefIs0(a[prop][prop1]));
            else return array.sort((a,b)=> undefIs0(a[prop][prop1]) - undefIs0(a[prop][prop1]));
        }
        else console.log('what sortBy recieved was not an array!')
    }
    // function exactMatchesUpTop(arr){
    //     arr.sort((a,b)=>{
    //         return a.
    //     })
    // }

    // function markup(arr, prop){
    //     for(let a=0; a < arr.length; a++){
    //         if(arr[a].about_me !== undefined) arr[a].type = "profile"; //* mark the type
    //         else if(arr[a].description !== undefined) arr[a].type = "story";
    //         else arr[a].type = "playlist";
    //     }
    //     return(arr);
    // }
        // if(desc) return array.sort((a,b)=> b[prop].reduce(getSum,0) - a[prop].reduce(getSum,0))
    // else return array.sort((a,b)=> a[prop].reduce(getSum,0) - b[prop].reduce(getSum,0))

        // function getSum(total, num) {
    //     return total + undefIs0(num);
    // }

    function processResults(resp){
        setResults(resp);
        prepareDisplayResults(null, resp, style);
    }

    function runSearch() {
        //* notice that returnAll is actually NOT sent! ^_^
        let queries = {
            // is_q: is_queue, is_cl: is_creator_list,
            searchFor: style, //* all, tags, author, title, description
            sc_size: sectionSize, sc_start: sectionStart, sc: sections,  
        }
        if (document.getElementById("returnProfiles").disabled === false) queries.r_pro = returnProfiles;
        if (document.getElementById("returnPlaylists").disabled === false) queries.r_play = returnPlaylists;
        if (document.getElementById("returnStories").disabled === false) queries.r_st = returnStories;
        console.log('queries is: ', queries)
        // `story/search/${search}`
        if(search){
            setSearched(true); 
            get_private(axP, nav, loc, 'story/search', { _id: search.trim(), queries, setter: processResults });
        }
        // else{
        //     alert('please input a search!')
        // }
    }

    console.log('results are: ', results)

    return(<div>
        <SearchComponent options = { options } value = { search } setValue = { setSearch }/>
        <button type="button" onClick={ runSearch }>Search</button>
        <div id="searchFilters" className = { searched ? "" : "hide" }>
            <h3>Search By: </h3>
            <button 
                type="button" 
                name="searchButton" 
                value="all"
                className = "focused" 
                onClick={ (e) => {
                    prepareDisplayResults(e, results, "all") 
                }}
            >
                All
            </button>

            <button 
                type="button" 
                name="searchButton" 
                value="author" 
                className="blurred" 
                onClick={ async (e) => {
                    prepareDisplayResults(e, results, "author") 
                }}
            >
                Author
            </button>

            <button 
                type="button" 
                name="searchButton" 
                value="title" className="blurred"
                onClick={ (e) => {
                    prepareDisplayResults(e, results, "title") 
                }}
                
            >
                Title
            </button>

            <button 
                type="button" 
                name="searchButton" 
                value="tags" className = "blurred"
                onClick={ (e) => {
                    prepareDisplayResults(e, results, "tags");
                }}
            >
                Tag
            </button>

            <button 
                type="button" 
                name="searchButton" 
                value="description" className="blurred"
                onClick={ (e) => {
                    prepareDisplayResults(e, results, "description") 
                }}
            >
                Description
            </button>

            <button type="button" onClick = { (e) => setViewReturnOptions(!viewReturnOptions) } >
                Options
            </button>
        </div>
        <div id="searchFilters1" className = { (searched && viewReturnOptions) ? "" : "hide" }>
            <h3>Return: </h3>
            <div id="returnAll_wrapper">
                <input 
                    type="checkbox"
                    id="returnAll"
                    name="returnCheck" 
                    value="all"
                    onChange={ (e) => { 
                        setReturnAll(!returnAll) 
                        setReturnStories(!returnAll)
                        setReturnProfiles(!returnAll)
                        setReturnPlaylists(!returnAll)
                        displayResults(results, { r_st: !returnAll, r_play: !returnAll, r_pro: !returnAll });
                    }} //# togglePersist
                    checked={ returnAll } //# persist
                />
                <label htmlFor="returnAll">All</label>
            </div>
            <div id="returnStories_wrapper">
                <input 
                    type="checkbox"
                    id="returnStories"
                    name="returnCheck" 
                    value="stories"
                    onChange={ (e) => {
                        displayResults(results, { r_st: !returnStories });
                        setReturnStories(!returnStories) 
                    }} //# togglePersist
                    checked={ returnStories } //# persist
                />
                <label htmlFor="returnStories">Stories</label>
            </div>
            <div id="returnProfiles_wrapper">
                <input 
                    type="checkbox"
                    id="returnProfiles"
                    name="returnCheck" 
                    value="profiles"
                    onChange={ (e) => {
                        displayResults(results, { r_pro: !returnProfiles });
                        setReturnProfiles(!returnProfiles);
                    }} //# togglePersist
                    checked={ returnProfiles } //# persist
                />
                <label htmlFor="returnProfiles">Profiles</label>
            </div>
            <div id="returnPlaylists_wrapper">
                <input 
                    type="checkbox"
                    id="returnPlaylists"
                    name="returnCheck" 
                    value="playlists"
                    onChange={ (e) => {
                        displayResults(results, { r_play: !returnPlaylists });
                        setReturnPlaylists(!returnPlaylists)
                    }} //# togglePersist
                    checked={ returnPlaylists } //# persist
                />
                <label htmlFor="returnPlaylists">Playlists</label>
            </div>
        </div>
        <div id="resultsDisplay">
            { shownResults && shownResults.length && shownResults.map((result, i)=>{
                switch(result.returnA){
                    case "profile":
                        //const status = (matchedSub && matchedSub.length) ? matchedSub.status === "approved" ? "subscribed" : "pending" : ""
                        return (<ProfileItem to = { `../../creatorProfile/${ result.creator._id }` } 
                            key = { result._id } entry = { result } options = {{ subscriptions }}/>)
                    case "playlist":
                        
                        const pMenu = {
                            general: playlistsMenu(forPlaylistsMenu, result, null, playlistSubscriptions, { subscribe_option: true })
                        }
                        return (<PlaylistItem to = { `../../creatorProfile/${ result.user_id }` } 
                            key = { result._id } entry = { result } menu = { pMenu }  options = {{ subscriptions }}/>)
                    case "story":
                        const menu = {
                            general: storyMenu(forStoryMenu, playlists, result, false)
                        }
                        return (<StoryItem to = {`/listenerSingleStory/${result._id}` } key = { result._id } story = { result } menu = { menu } />)
                    default:
                        return <div key= { `result_${i}` }>{ result.title }</div>
                }
                
            })}
            { shownResults && shownResults.length &&
                 <button onClick={ (e)=> {
                    setSections(sections + 1);
                    displayResults(results, { sectz: sections + 1 })
                }}>See More</button>
            }
        </div>
    </div>)
}