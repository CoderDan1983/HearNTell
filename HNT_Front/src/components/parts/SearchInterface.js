import { useState } from 'react';
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

export default function SearchInterface({ options, playlists, goTo, subscriptions }){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const [ searched, setSearched ] = useState(false);
    const [ search, setSearch ] = useState("");
    // const [ options, setOptions ] = useState("");
    const [ results, setResults ] = useState([]);
    const [shownResults, setShownResults] = useState([]);

    const [ viewReturnOptions, setViewReturnOptions ] = useState(false);
    const [ returnAll , setReturnAll ] = useState(true);
    const [ returnStories , setReturnStories ] = useState(true);
    const [ returnProfiles , setReturnProfiles ] = useState(true);
    const [ returnPlaylists , setReturnPlaylists ] = useState(true);
    // const [ returnDescriptions , setReturnDescriptions ] = useState(true);

    const [ sections, setSections ] = useState(1);
    const [ sectionStart, setSectionStart ] = useState(0);
    const [ sectionSize, setSectionSize ] = useState(10);

    console.log('returnStories is; ', returnStories);

    const [ style, setStyle ] = useState("all");
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
    const creatorSubscriptions = subscriptions.filter((sub)=> !sub.playlist_id);
    
    const forPlaylistsMenu = { nav, loc, axP, goTo };
    const forStoryMenu = { nav, loc, axP, goTo };

    function prepareDisplayResults(e, results, style){
        
        //@ this changes how the buttons are displayed relative to focus :)
        if(e){ //* NOTE:  this only runs if an event is passed in here, so to speak :)
            const searchButtons = document.getElementsByName("searchButton");
            setStyle(e.target.value);
            searchButtons.forEach((btn) => { 
                btn.className = "blurred"
                if(e.target === btn){
                    btn.className = "focused";
                }
            });
        }

        //@ load the results of what should be displayed into the displayArr!
        let displayArr = [];
        if(style === "all") { 
            const { stories, profiles, playlists, descriptions, search_string } = results; //* note: some of these may be undefined :)
            if(profiles && profiles["author"]) displayArr = displayArr.concat(profiles["author"]);

            if(playlists && playlists["author"]) displayArr = displayArr.concat(playlists["author"]);
            if(playlists && playlists["title"]) displayArr = displayArr.concat(playlists["title"]);

            if(stories && stories["author"]) displayArr = displayArr.concat(stories["author"]);
            if(stories && stories["title"]) displayArr = displayArr.concat(stories["title"]);
            if(stories && stories["tags"]) displayArr = displayArr.concat(stories["tags"]);
            if(stories && stories["description"]) displayArr = displayArr.concat(stories["description"]);
        }
        else {
            const section = results[style];
            console.log('82.  section is: ', section);
            if(section && section["author"]) displayArr = displayArr.concat(section["author"]);
            if(section && section["title"]) displayArr = displayArr.concat(section["title"]);
            if(section && section["tags"]) displayArr = displayArr.concat(section["tags"]);
            if(section && section["description"]) displayArr = displayArr.concat(section["description"]);
        };

        // exactMatchesUpTop(displayArr); //@ sort the most accurate matches to the top!

        setShownResults(displayArr);
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
    function processResults(resp){
        setResults(resp);
        prepareDisplayResults(null, resp, style);
    }

    console.log('results are: ', results)

    return(<div>
        <SearchComponent options = { options } value = { search } setValue = { setSearch }/>
        <button type="button" onClick={ (e)=>  {
            //* notice that returnAll is actually NOT sent! ^_^
            // const queries = { 
            //     returnStories, 
            //     returnProfiles, 
            //     returnPlaylists, 
            //     returnDescriptions 
            // };

            // const is_queue: 
            let queries = {
                // is_q: is_queue, is_cl: is_creator_list,
                searchFor: style, //* all, tags, author, title, description
                r_st: returnStories, r_pro: returnProfiles, r_play: returnPlaylists, 
                // r_des: returnDescriptions, //? keep ?
                sc_size: sectionSize, sc_start: sectionStart, sc: sections,  
            }
            // `story/search/${search}`
            if(search){
                setSearched(true); 
                get_private(axP, nav, loc, 'story/search', { _id: search.trim(), queries, setter: processResults });
            }
            else{
                alert('please input a search!')
            }
        } }>Search</button>
        <div id="searchFilters" className = { searched ? "" : "hide" }>
            <h3>Search By: </h3>
            <button 
                type="button" 
                name="searchButton" 
                value="all"
                className = "focused" 
                onClick={ (e) => prepareDisplayResults(e, results, "all") }
            >
                All
            </button>
            <button 
                type="button" 
                name="searchButton" 
                value="tags" className = "blurred"
                onClick={ (e) => prepareDisplayResults(e, results, "tags") }
            >
                Tag
            </button>
            <button 
                type="button" 
                name="searchButton" 
                value="author" 
                className="blurred" 
                onClick={ (e) => prepareDisplayResults(e, results, "author") }
            >
                Author
            </button>
            <button 
                type="button" 
                name="searchButton" 
                value="title" className="blurred"
                onClick={ (e) => prepareDisplayResults(e, results, "title") }
            >
                Title
            </button>
            <button 
                type="button" 
                name="searchButton" 
                value="description" className="blurred"
                onClick={ (e) => prepareDisplayResults(e, results, "description") }
            >
                Title
            </button>
            <button type="button" onClick = { (e) => setViewReturnOptions(!viewReturnOptions) } >
                Options
            </button>
        </div>
        <div id="searchFilters1" className = { (searched && viewReturnOptions) ? "" : "hide" }>
            <h3>Return: </h3>
            <input 
                type="checkbox"
                id="returnAll"
                name="searchCheck" 
                value="all"
                onChange={ (e) => { 
                    setReturnAll(!returnAll) 
                    setReturnStories(!returnAll)
                    setReturnProfiles(!returnAll)
                    setReturnPlaylists(!returnAll)
                    //# setReturnDescriptions(!returnAll)
                }} //# togglePersist
                checked={ returnAll } //# persist
            />
            <label htmlFor="returnAll">All</label>

            <input 
                type="checkbox"
                id="returnStories"
                name="searchCheck" 
                value="stories"
                onChange={ (e) => setReturnStories(!returnStories) } //# togglePersist
                checked={ returnStories } //# persist
            />
            <label htmlFor="returnStories">Stories</label>

            <input 
                type="checkbox"
                id="returnProfiles"
                name="searchCheck" 
                value="profiles"
                onChange={ (e) => setReturnProfiles(!returnProfiles) } //# togglePersist
                checked={ returnProfiles } //# persist
            />
            <label htmlFor="returnProfiles">Profiles</label>

            <input 
                type="checkbox"
                id="returnPlaylists"
                name="searchCheck" 
                value="playlists"
                onChange={ (e) => setReturnPlaylists(!returnPlaylists) } //# togglePersist
                checked={ returnPlaylists } //# persist
            />
            <label htmlFor="returnPlaylists">Playlists</label>
        </div>
        <div id="resultsDisplay">
            { shownResults && shownResults.length && shownResults.map((result, i)=>{
                switch(result.type){
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
        </div>
    </div>)
}