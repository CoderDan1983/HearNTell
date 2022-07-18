import { Link } from 'react-router-dom';
import '../../index.css';

import BuildOutIco from './BuildOutIco';
import BasicMenu from './BasicMenu';


//@ entry (required) takes an object that will be referred to to display the "main info".
//* to (optional) where to go when clicked, 
//* classy (optional) (the class of the Link), 
//* PreIco (optional) icon that goes before everything else
//* IcoArray (optional) an object array of Icon, clickHandler, and optional props to control
//* ... the icons the appear after the main "body".
//* _id: optional.  can be used to help control where we go when we click TagLinkList.
//* childHere.  Optional.  If true and you have children, will place them here instead of Icon!
//* Ico.  Optional (legacy?) that allows for an icon to be simply placed.

// 

export default function LinkCapsule({ to, IcoArray, menu, classy="link", _id, 
entry = {}, options, children }){
    const defaultWrapClass = (IcoArray && IcoArray.length && IcoArray.some((ico)=> { return ico.pre === true })) ? "storyItemWithPreIco" : "storyItem";
    // const defaultWrapClass = "storyItem"
    const wrapperClass = (options && options.wrapperClass) ? options.wrapperClass : defaultWrapClass;
    // console.log('LinkCapsule 22.  entry is: ', entry);
    // console.log('also, IcoArray is: ', IcoArray);
    const url = _id ? `${to}/${_id}` : to;

    return(<div className={ wrapperClass }>
        {/* { IcoArray && IcoArray.length && 
        <BuildOutIcoArray IcoArray = { IcoArray } entry = { entry } pre = { true } /> } */}
        { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
            return <BuildOutIco entry = { entry } ico = { ico } i = { i } key= { i } pre = { true }/>
        })}
        {/* //@This Link element holds ALL the non-icon interface! */}
        { to ? 
            <Link className= { classy } to = { url } >
                { children }
            </Link> :

            <div className= { classy } >
                { children }
            </div>
        }
        { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
            return <BuildOutIco entry = { entry } ico = { ico } i = { i } key= { i }/>
        })}
         {/*  */}
        {/* <div>Khan Ewe Sea Mi</div> */}
        {/* optional.  pass in a menu to have a menu */}
        { menu && <BasicMenu menu= { menu } /> }
    </div>)
}



{/* <div key= { i } className = { ico.class ? ico.class : "inherit" }> 
                    { children } 
                </div> : */}