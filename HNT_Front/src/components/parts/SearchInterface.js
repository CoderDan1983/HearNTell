import { useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { get_private } from '../../hooks/useBackendRequest';
import SearchComponent from "./SearchComponent"
import '../../index.css'

export default function SearchInterface({ options }){
    const axP = useAxiosPrivate();
    const nav = useNavigate();
    const loc = useLocation();
    const [ searched, setSearched ] = useState(false);
    const [ search, setSearch ] = useState("");
    // const [ options, setOptions ] = useState("");
    const [ results, setResults ] = useState([]);
    const [shownResults, setShownResults] = useState([]);
    const [ style, setStyle ] = useState("all");
    console.log('start', '------------>')
    // console.log('options are: ', options);
    console.log('results are: ', results);
    console.log('searched is: ', searched);
    console.log('shownResults is: ', shownResults);
    console.log('style is: ', style);
    console.log('end', '.................');

    function prepareDisplayResults(e, results, style){
        
        //* this changes how the buttons are displayed relative to focus :)
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

        //* actually sorts the results, so to speak ^_^ "process results"
        let displayArr = [];
        if(style === "all") { 
            displayArr = [ ...results["tag"], ...results["author"], ...results["title"]];
        }
        else {
            displayArr = results[style] 
        };
        setShownResults(displayArr);
    }

    function processResults(resp){
        setResults(resp);
        prepareDisplayResults(null, resp, style);
    }

    console.log('results are: ', results)

    return(<div>
        <SearchComponent options = { options } value = { search } setValue = { setSearch } />
        <button type="button" onClick={ (e)=>  { 

            setSearched(true); 
            get_private(axP, nav, loc, `story/search/${search}`, { setter: processResults });
        } }>Search</button>
        <div id="searchFilters" className = { searched ? "" : "hide" }>
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
                value="tag" className = "blurred"
                onClick={ (e) => prepareDisplayResults(e, results, "tag") }
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
        </div>
        <div id="resultsDisplay">
            { shownResults && shownResults.length && shownResults.map((result)=>{
                return <div>{ result.title }</div>
            })}
        </div>
    </div>)
}