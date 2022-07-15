import { Link } from 'react-router-dom';
import '../../index.css';

import BasicMenu from './BasicMenu';
import ModalComponent from './ModalComponent';

//@ entry (required) takes an object that will be referred to to display the "main info".
//* to (optional) where to go when clicked, 
//* classy (optional) (the class of the Link), 
//* PreIco (optional) icon that goes before everything else
//* IcoArray (optional) an object array of Icon, clickHandler, and optional props to control
//* ... the icons the appear after the main "body".
//* _id: optional.  can be used to help control where we go when we click TagLinkList.
//* childHere.  Optional.  If true and you have children, will place them here instead of Icon!

// 

export default function LinkCapsule({ to, entry, classy="link", wrapperClass="storyItem", 
IcoArray, _id, menu, children }){
    const url = _id ? `${to}/${_id}` : to;

    return(<div className={ wrapperClass ? wrapperClass : "storyItem" }>
        {/* //@This Link element holds ALL the non-icon interface! */}
        { to ? 
            <Link className= { classy } to = { url } >
                { children }
            </Link> :

            <div className= { classy } >
                { children }
            </div>
        }

        {/* //@The IcoArray is an object array of objects such as these, for the icons.
            {   //* to control an "icon"
                clickHandler, Icon, //required
                class, info, //optional class.  optional info to be passed into clickHandler
                pre, post //optional text to go before/after icon
            },
            { //* to control a modal
                Component (required for modal).  
                    Contains the component that will go inside the modal, and indicates we will be using a modal)
                Ico (optional) - the icon this modal will use,
                cProps (optional) - the props that will be passed into the Component, along with the "entry"!
                buttonTitle (optional) - the text for the 'open modal button'
                class (see above)
            }

        */}
        
        { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
            const icoClass = ico.class ? ico.class : "inherit";
            return (
                ico.Component ? //* For Modals
                <div key = { i } className = { icoClass }>
                    <ModalComponent 
                        buttonTitle= { ico.buttonTitle } 
                        Ico= { ico.Ico } 
                        cProps = { {...ico.cProps, ...entry } }
                        Component = { ico.Component }
                    />
                </div> 
                : //* for icons
                <div key = { i } className = { icoClass }> 
                    { ico.pre }  {/* optional text that goes before */}
                    <ico.Icon 
                        onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info, entry) } 
                    />
                    { ico.post }  {/* optional text that goes after */}
                </div>
            );
        })}
        {/* optional.  pass in a menu to have a menu */}
        { menu && <BasicMenu menu= { menu } /> }
    </div>)
}



{/* <div key= { i } className = { ico.class ? ico.class : "inherit" }> 
                    { children } 
                </div> : */}