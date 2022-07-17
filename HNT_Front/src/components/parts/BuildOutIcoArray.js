import ModalComponent from './ModalComponent';

export default function BuildOutIcoArray({ IcoArray, entry, pre }){
    IcoArray.map((ico, i)=>{
        const icoClass = ico.class ? ico.class : "inherit";
        return (
            ico.pre != pre ?
            <></> :
            ico.ComponentForModal ? //* For Modals
            <div key = { i } className = { icoClass }>
                <ModalComponent 
                    buttonTitle= { ico.buttonTitle } 
                    Ico= { ico.Ico } 
                    cProps = { {...ico.cProps, ...entry } }
                    Component = { ico.ComponentForModal }
                />
            </div> :
            ico.Component ? //* For passed in Components            
                < ico.Component
                    key = { i } 
                    className = { icoClass }
                    cProps = { {...ico.cProps, ...entry } }
                    Component = { ico.Component }
                />
            : //* for icons
            <div key = { i } className = { icoClass }> 
                { ico.preText }  {/* optional text that goes before */}
                <ico.Icon 
                    onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info, entry) } 
                />
                { ico.postText }  {/* optional text that goes after */}
            </div>
        );
    })
}

/* //^The IcoArray is an object array of objects such as these, for the icons.
    {   //* to control an "icon"
        clickHandler, Icon, //required
        class, info, //optional class.  optional info to be passed into clickHandler
        preText, postText, //optional text to go before/after icon
        pre, //optional.  if true, icon will go before the main link capsule "body"
    },
    { //* to control a modal
        ModalComponent (required for modal).  
            Contains the component that will go inside the modal, and indicates we will be using a modal)
        Ico (optional) - the icon this modal will use,
        cProps (optional) - the props that will be passed into the ModalComponent, along with the "entry"!
        buttonTitle (optional) - the text for the 'open modal button'
        class, pre (for both, see above)
    },
    { //* to control a Component
        Component (required).  
            Contains the component that will go inside the modal, and indicates we will be using a modal)                
        cProps (optional) - the props that will be passed into the Component, along with the "entry"!
        class, pre (for both, see above)
    },
*/