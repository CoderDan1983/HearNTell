import { useRef, useState, createContext } from "react"
import useClickOutside from "../../hooks/useClickOutside";
import '../../index.css';

export const ModalContext = createContext();

export default function ModalWrapper({ children, className, buttonTitle }) {
    const [open, setOpen] = useState(false);
    const openClicked = useRef(false); //* I ended up adding the openClicked variable to make the code work! 
    const modalRef = useRef();
    
    // console.log('PlaylistModal loaded!')
    useClickOutside(modalRef, () => {
        // console.log('useClickOutside!');
        if (open && openClicked.current !== true) setOpen(false)    
        openClicked.current = false;
    })

    const handleOpen = () => {
        openClicked.current = true;
        setOpen(true); //* if open has been set to true, openClicked.current has too!
    };

    return (
        <ModalContext.Provider value={{ setOpen }}>
            <button onClick={ handleOpen }>{ buttonTitle ? buttonTitle : "Open" }</button>
            <div
                ref={modalRef}
                // className = { open ? "modal" : "hide" }
                className = { open ? (className ? className : "modal") : "hide" }
            >
                { open && children }
            </div>
        </ModalContext.Provider>
    )
}




//* how to wrap a component in another component!
// const Wrap = ({ children }) => <div>{children}</div>
// export default () => <Wrap><h1>Hello word</h1></Wrap>

// import { useRef, useState } from "react"
// import useClickOutside from "../hooks/useClickOutside";

// export default function ClickOutsideComponent() {
//     const [open, setOpen] = useState(false);
//     const openClicked = useRef(false); //* I ended up adding the openClicked variable to make the code work! 
//     const modalRef = useRef()
//     console.log('component loaded!')
//     useClickOutside(modalRef, () => {
//         //console.log('useClickOutside!')
//         if (open && openClicked.current !== true) setOpen(false)    
//         openClicked.current = false;
//     })

//     const handleOpen = () => {
//         //console.log('handleOpen!')
//         openClicked.current = true;
//         setOpen(true); //* if open has been set to true, openClicked.current has too!
//     };

//     return (
//         <>
//         <button onClick={ handleOpen }>Open</button>
//         <div
//             ref={modalRef}
//             style={{
//                 display: open ? "block" : "none",
//                 backgroundColor: "blue",
//                 color: "white",
//                 width: "300px",
//                 height: "300px",
//                 position: "absolute",
//                 top: "calc(50% - 150px)",
//                 left: "calc(50% - 150px)",
//                 opacity: "0.3",
//             }}
//         >
//             <span>Modal</span>
//         </div>
//         </>
//     )
// }

