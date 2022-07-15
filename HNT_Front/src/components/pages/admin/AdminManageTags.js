import TagsAdmin from '../../parts/TagsAdmin';
import { useState, useEffect } from "react";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";

import CreateTag from './CreateTag';
import CreateTagPseudoComponent from '../../parts/ModalComponent';
// import ModalWrapper from '../../parts/ModalWrapper'
import { makeAddOneSetter, makeUpdateOneByIdSetter } from '../../../custom_modules_front/utility_front';
import EditIcon from '@mui/icons-material/Edit';

import AdminTagDisplay from './AdminTagDisplay';

function AdminManageTags(){
    const [ tags, setTags ] = useState();
    const addATagSetter = makeAddOneSetter( tags, setTags ); //* For use in CreateTag component
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    console.log('tags are : ', tags);

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getTags = async () => {
            try {
                const response = await axiosPrivate.get('/api/tag/admin_index', { 
                    signal: controller.signal
                });
                const tags = response.data;
                isMounted && setTags(tags) //if isMounted, then setUsers :D
            }
            catch (err){
                console.log("I'm gonna log an error!")
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getTags();

        return () =>{ //* cleanup function ^_^
            isMounted = false;
            controller.abort();
        }
    }, [])

    const createModalInfo = {
        Ico: EditIcon, buttonTitle: "Create Tag",
        Component: CreateTag,
        cProps: { setter: addATagSetter }
    }

    return(
        <>
            <h1 className="services">Manage Tags</h1>
            {/* <ModalWrapper buttonTitle="Create Tag">
                <CreateTag setter={addATagSetter}/>
            </ModalWrapper> */}
            <CreateTagPseudoComponent { ...createModalInfo }/>

            <h1>Active Tags</h1>
            <AdminTagDisplay tags = { tags } setTags = { setTags } blocked = { false } />

            <h2>Blocked Tags</h2>
            <AdminTagDisplay tags = { tags } setTags = { setTags }  blocked = { true } />
        </>
    )
}

export default AdminManageTags;





            // {/* {
            //     <SideNavLink
            //     {...(isActive && { // this spread operator
            //       bg: "teal.200",
            //       rounded: "sm",
            //     })}
            //     {...props}
            //   />
            // } */}


// (
//     <ul>
//          { tags.filter(tag => tag.is_blocked === false).map((tag, i) => {
//              return (
//                  <li key={i}>{tag.name}             
//                      <ModalWrapper buttonTitle="Edit">
//                          <EditTag tag_id={tag._id} setter={updateATagSetter}/>
//                      </ModalWrapper>
//                  <button data-id={tag._id} onClick={removeTag}>Remove</button>
//                  <button data-id={tag._id} onClick={blockTag}>Block</button></li>
//              )
//          })}
//     </ul> 
//  )




// (
//     <ul>
//          { tags.filter(tag => !tag.is_blocked).map((tag, i) =>  { 
//              return (
//                  <li key={i}>{tag.name} 
//                  <ModalWrapper buttonTitle="Edit">
//                      <EditTag tag_id={tag._id} setter={updateATagSetter}/>
//                  </ModalWrapper>
//                  <button data-id={tag._id} onClick={removeTag}>Remove</button>
//                  <button data-id={tag._id} onClick={unblockTag}>unblock</button></li>
//          )
//          })}
//     </ul> 
//  )








// {
//     tags?.length ?
//     (
//     //    <ul>
//             { tags.map((tag, i) =>         
//                 // console.log('tag is: ', tag);
                
//                 <LinkCapsule 
//                     tag= { tagBodyEx } 
//                     IcoArray = { IcoArray } 
//                     wrapperClass="tagItem" 
//                     classy="tagLine"
//                 >
//                     <ModalWrapper buttonTitle="Edit" Ico= { EditIcon }>
//                         <EditTag tag_id={tag._id} setter={updateATagSetter}/>
//                     </ModalWrapper>
//                 </LinkCapsule> 
//             }
//             // <li key={i}>{tag.name}
//                 {/* <ModalWrapper buttonTitle="Edit" Ico= { EditIcon }>
//                     <EditTag tag_id={tag._id} setter={updateATagSetter}/>
//                 </ModalWrapper> */}
                
//             {/* <button data-id={tag._id} onClick={removeTag}>Remove</button></li>)  */}
        
//     //    </ul> 
//     )
//     : <p>No tags to display</p>
// }