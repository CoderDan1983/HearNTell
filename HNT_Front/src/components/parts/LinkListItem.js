import LinkCapsule from './LinkCapsule';

export default function LinkListItem({ to, IcoArray, menu, classy="link", _id, name }){
    console.log('LinkListItem, line 4.  IcoArray is: ', IcoArray);
    return(<LinkCapsule to = { to } IcoArray = { IcoArray } menu = { menu } classy = { classy } _id = { _id }>
        <>
            { name }
        </>
    </LinkCapsule>)
}



//* old version
// import { Link } from 'react-router-dom';
// import '../../index.css';
// import BasicMenu from './BasicMenu';

// export default function LinkListItem({ to, classy="link", IcoArray, _id, menu, name, PreIco, Ico }){
//     //console.log('reloading LinkListItem!', name, _id)
//     const url = _id ? `${to}/${_id}` : to;

//     return(<div className={ PreIco ? "storyItemWithPreIco" : "storyItem" }>
//         { PreIco && <PreIco /> }
//         <Link to={ url }>
//             <div className= { classy }>
//                 { name }
//             </div>
//         </Link>
//         { Ico && <Ico /> }
//         { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
//             return ((!ico.preText && !ico.postText) ? 
//                 <ico.Icon 
//                     className = { ico.class ? ico.class : "inherit" } 
//                     key = { i } 
//                     onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info) } 
//                 /> :
//                 ico.preText ? 
//                 <div key = { i } className = { ico.class ? ico.class : "inherit" }>
//                     {ico.preText} 
//                     <ico.Icon onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info) } />
//                 </div> : 
//                 <div key = { i } className = { ico.class ? ico.class : "inherit" }>
//                     <ico.Icon onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info) } />
//                     {ico.postText}
//                 </div> 
//             );
//         })}
//         { menu && <BasicMenu menu= { menu } /> }
//     </div>)
// }

