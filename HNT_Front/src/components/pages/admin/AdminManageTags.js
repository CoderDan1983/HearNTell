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

    const tagBodyEx = { 
        name: "runner",
        cost: 99,
        highestBidder: 105,
        storyNum: 10,
    }
    const IcoArray = [
        // {
        //     Icon: EditIcon,
        //     pre: "Edit",
        //     class: "approveSurround",
        // },
        { childHere: true, class: "approveSurround" },
        {
            Icon: CloseIcon,
            pre: "Remove",
            class: "rejectSurround",
        },
    ]

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

    //* Remove ad and refreash the Ad state.
    const removeTag = async (e) => {
        e.preventDefault();
        const tag_id = e.target.dataset.id;
        const deleted_tag = await axiosPrivate.delete(`/api/tag/${tag_id}`, { 
        });
        const newTags = tags.filter((tag) => tag._id !== deleted_tag.data._id);
        setTags(newTags);
    }

    return(
        <>
            <h1 className="services">Manage Tags</h1>
            <ModalWrapper buttonTitle="Create Tag">
                <CreateTag setter={addATagSetter}/>
            </ModalWrapper>
            {
                tags?.length ?

                    tags.map((tag, i) =>         
                    <TagLinkItem 
                        tag= { { ...tagBodyEx, name: tag.name } }
                        IcoArray = { IcoArray } 
                        wrapperClass="tagItem" 
                        classy="tagLine"
                        key= { i }
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