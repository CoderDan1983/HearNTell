import TagsAdmin from '../../parts/TagsAdmin';
import { useState, useEffect } from "react";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import EditTag from './EditTag';
import CreateTag from './CreateTag';
import ModalWrapper from "../../parts/ModalWrapper";
import { makeAddOneSetter, makeUpdateOneByIdSetter } from '../../../custom_modules_front/utility_front';
import TagLinkItem from '../../parts/TagLinkItem';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

function AdminManageTags(){
    const [ tags, setTags ] = useState();
    const addATagSetter = makeAddOneSetter( tags, setTags ); //* For use in CreateTag component
    const updateATagSetter = makeUpdateOneByIdSetter( tags, setTags ); //* For use in EditTag component
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    console.log('tags are : ', tags);

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getTags = async () => {
            try {
                const response = await axiosPrivate.get('/api/tag', { 
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

    //* Remove tag and refreash the Tag state.
    const removeTag = async (e, i, info) => {
        e.preventDefault();
        console.log('removeTag.  info is: ', info);
        const tag_id = e.target.dataset.id;
        const deleted_tag = await axiosPrivate.delete(`/api/tag/${tag_id}`, { 
        });
        const newTags = tags.filter((tag) => tag._id !== deleted_tag.data._id);
        setTags(newTags);
    }

    //* Block tag in database and update local page state.
    const blockTag = async (e, i, info) => {
        e.preventDefault();
        console.log('blockTag.  info is: ', info);
        const tag_id = e.target.dataset.id;
        const blocked_tag = await axiosPrivate.post(`/api/tag/${tag_id}/block`, { 
        });
        updateATagSetter(blocked_tag.data._id);
    }

    //* Unblock tag in database and update local page state.
    const unblockTag = async (e, i, info) => {
        e.preventDefault();
        console.log('unblockTag.  info is: ', info);

        const tag_id = e.target.dataset.id;
        const unblocked_tag = await axiosPrivate.post(`/api/tag/${tag_id}/unblock`, { 
        });
        updateATagSetter(unblocked_tag.data._id);
    }


    const IcoArray = [
        { childHere: true, class: "approveSurround" },
        {
            Icon: CloseIcon,
            pre: "Remove",
            class: "rejectSurround",
        },
        {
            Icon: CloseIcon,
            pre: "Block",
            class: "rejectSurround",
            clickHandler: blockTag,
        },
    ]

    const IcoArrayBlocked = [
        { childHere: true, class: "approveSurround" },
        {
            Icon: CloseIcon,
            pre: "Remove",
            class: "rejectSurround",
        },
        {
            Icon: CloseIcon,
            pre: "Unblock",
            class: "rejectSurround",
            clickHandler: unblockTag,
        },
    ]

    return(
        <>
            <h1 className="services">Manage Tags</h1>
            <ModalWrapper buttonTitle="Create Tag">
                <CreateTag setter={addATagSetter}/>
            </ModalWrapper>
            {   
                //* Render non blocked tags.
                tags?.length ?
                    tags.filter(tag => !tag.is_blocked).map((tag, i) =>         
                    <TagLinkItem 
                        tag= { tag }
                        IcoArray = { IcoArray } 
                        wrapperClass="tagItem" 
                        classy="tagLine"
                        key= { i }
                        info = { { "data-id": tag._id } }
                    >
                        <ModalWrapper buttonTitle="Edit" Ico= { EditIcon }>
                            <EditTag tag_id={tag._id} setter={updateATagSetter}/>
                        </ModalWrapper>
                    </TagLinkItem>)
                : <p>No tags to display</p>
            }

            <h2>Blocked Tags</h2>
            {
                //* Render blocked tags.
                tags?.length ?
                    tags.filter(tag => tag.is_blocked).map((tag, i) =>         
                    <TagLinkItem 
                        tag= { tag }
                        IcoArray = { IcoArrayBlocked } 
                        wrapperClass="tagItem" 
                        classy="tagLine"
                        key= { i }
                        // data-id = { tag._id }
                        info = { { "data-id": tag._id } }
                    >
                        <ModalWrapper buttonTitle="Edit" Ico= { EditIcon }>
                            <EditTag tag_id={tag._id} setter={updateATagSetter}/>
                        </ModalWrapper>
                    </TagLinkItem>)
                : <p>No tags to display</p>
            }
        </>
    )
}



export default AdminManageTags;



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
                
//                 <TagLinkItem 
//                     tag= { tagBodyEx } 
//                     IcoArray = { IcoArray } 
//                     wrapperClass="tagItem" 
//                     classy="tagLine"
//                 >
//                     <ModalWrapper buttonTitle="Edit" Ico= { EditIcon }>
//                         <EditTag tag_id={tag._id} setter={updateATagSetter}/>
//                     </ModalWrapper>
//                 </TagLinkItem> 
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