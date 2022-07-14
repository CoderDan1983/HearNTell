import { Link } from 'react-router-dom';
import '../../index.css';
// import ListenerSingleStory from '../pages/listener/ListenerSingleStory';
import BasicMenu from './BasicMenu';

//@ tag (required) takes an object that will be referred to to display the "main info".
//* to (optional) where to go when clicked, 
//* classy (optional) (the class of the Link), 
//* PreIco (optional) icon that goes before everything else
//* IcoArray (optional) an object array of Icon, clickHandler, and optional props to control
//* ... the icons the appear after the main "body".
//* _id: optional.  can be used to help control where we go when we click TagLinkList.
//* childHere.  Optional.  If true and you have children, will place them here instead of Icon!

export default function TagLinkItem({ to, tag, classy="link", wrapperClass="storyItem", 
IcoArray, _id, menu, children }){
    const url = _id ? `${to}/${_id}` : to;

    return(<div className={ wrapperClass ? wrapperClass : "storyItem" }>
        {/* //@This Link element holds ALL the non-icon interface! */}
        {/* <div to={ url }>   */}
        <div>
            <div className= { classy }>
                <p>Name: { tag.name }</p>
                <p>Cost: { tag.cost }</p>
                <p>Highest Bidder: { tag.highestBidder }</p>
                <p># of Stories { tag.storyNum }</p>
            </div>
        </div>
        {/* //@The IcoArray is an object array of objects such as these, for the icons.
            {   
                clickHandler, Icon, //required
                class, info, //optional class.  optional info to be passed into clickHandler
                pre, post //optional text to go before/after icon
            } 
        */}
        
        { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
            return (
                ico.childHere ?
                <div key= { i } className = { ico.class ? ico.class : "inherit" }> 
                    { children } 
                </div> :
                <div key = { i } className = { ico.class ? ico.class : "inherit" }>
                    { ico.pre }  {/* optional text that goes before */}
                    <ico.Icon 
                        onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info) } 
                    />
                    { ico.post }  {/* optional text that goes after */}
                </div>
            );
        })}
        {/* optional.  pass in a menu to have a menu */}
        { menu && <BasicMenu menu= { menu } /> }
    </div>)
}