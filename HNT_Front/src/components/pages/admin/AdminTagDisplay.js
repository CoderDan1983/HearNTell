import TagLinkItem from '../../parts/TagLinkItem';
import ModalComponent from '../../parts/ModalComponent';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

import EditTag from './EditTag';
import { makeAddOneSetter, makeUpdateOneByIdSetter } from '../../../custom_modules_front/utility_front';

export default function AdminTagDisplay({ tags, setTags, blocked: blockState }){
    const axiosPrivate = useAxiosPrivate();
    const updateATagSetter = makeUpdateOneByIdSetter(tags, setTags ); //* For use in EditTag component

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
        {
            Modal: ModalComponent,
            Component: EditTag,
            Ico: EditIcon, 
            buttonTitle: "Edit",
            cProps: { setter: updateATagSetter },
            class: "approveSurround",
        },
        {
            Icon: CloseIcon,
            pre: "Remove",
            class: "rejectSurround",
        },
        {
            Icon: blockState ? DoneIcon : CloseIcon,
            pre: blockState ? "Unblock" : "Block",
            class: blockState ? "approveSurround" : "rejectSurround",
            clickHandler: (blockState ? unblockTag : blockTag),
        },
    ]

    return (   
        //* Render non blocked state.
        tags?.length ?
            tags.filter(tag => tag.is_blocked === blockState).map((tag, i) =>         
            <TagLinkItem 
                entry= { tag }
                IcoArray = { IcoArray } 
                wrapperClass="tagItem" 
                classy="tagLine"
                key= { i }
            >
                <>
                    <p>Name: { tag.name }</p>
                    <p>Cost: { tag.cost }</p>
                    <p>Highest Bidder: { tag.highestBidder }</p>
                    <p># of Stories { tag.storyNum }</p>
                </>
            </TagLinkItem>)
        : <p>No tags to display</p>
    )
}