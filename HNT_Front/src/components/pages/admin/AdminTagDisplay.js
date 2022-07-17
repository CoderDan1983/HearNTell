import LinkCapsule from '../../parts/LinkCapsule';
// import ModalComponent from '../../parts/ModalComponent';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

import EditTag from './EditTag';
import { makeUpdateOneByIdSetter } from '../../../custom_modules_front/utility_front';

export default function AdminTagDisplay({ tags, setTags, blocked: blockState }){
    const axiosPrivate = useAxiosPrivate();
    const updateATagSetter = makeUpdateOneByIdSetter(tags, setTags ); //* For use in EditTag component

    //* Remove tag and refreash the Tag state.

    const removeTag = async (e, i, info, tag) => {
        e.preventDefault();
        const tag_id = tag._id;
        const deleted_tag = await axiosPrivate.delete(`/api/tag/${tag_id}`, { 
        });
        const newTags = tags.filter((tag) => tag._id !== deleted_tag.data._id);
        setTags(newTags);
    }

    //* Block tag in database and update local page state.
    const blockTag = async (e, i, info, tag) => {
        e.preventDefault();
        const tag_id = tag._id;
        const blocked_tag = await axiosPrivate.post(`/api/tag/${tag_id}/block`, { 
        });
        console.log("blocked data: ",blocked_tag.data)

        updateATagSetter(blocked_tag.data);
    }

    //* Unblock tag in database and update local page state.
    const unblockTag = async (e, i, info, tag) => {
        e.preventDefault();
        const tag_id = tag._id;
        const unblocked_tag = await axiosPrivate.post(`/api/tag/${tag_id}/unblock`, { 
        });
        console.log("Unblocked data: ",unblocked_tag.data)
        updateATagSetter(unblocked_tag.data);
    }

    const IcoArray = [
        {
            ComponentForModal: EditTag,
            Ico: EditIcon, 
            buttonTitle: "Edit",
            cProps: { setter: updateATagSetter },
            class: "approveSurround",
        },
        {
            Icon: CloseIcon,
            preText: "Remove",
            class: "rejectSurround",
            clickHandler: removeTag,
        },
        {
            Icon: blockState ? DoneIcon : CloseIcon,
            preText: blockState ? "Unblock" : "Block",
            class: blockState ? "approveSurround" : "rejectSurround",
            info: {},
            clickHandler: (blockState ? unblockTag : blockTag),
        },
    ]

    return (   
        //* Render non blocked state.
        tags?.length ?
            tags.filter(tag => tag.is_blocked === blockState).map((tag, i) =>         
            <LinkCapsule 
                entry= { tag }
                IcoArray = { IcoArray } 
                wrapperClass="tagItem" 
                classy="tagLine"
                key= { i }
            >
                <>
                    <p>Name: { tag.name }</p>
                    <p>Highest: { tag.highest_bid }</p>
                    <p>Highest Bidder: { tag.highest_bidder }</p>
                    <p># of Stories { tag.number_of_stories_with_tag }</p>
                </>
            </LinkCapsule>)
        : <p>No tags to display</p>
    )
}