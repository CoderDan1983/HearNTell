import LinkCapsule from './LinkCapsule';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function ProfileItem({ options = {}, to, IcoArray = [], menu, entry }){
    const { createdAt, updatedAt, user_id, about_me, image_name, creator, } = entry; //private //* unused: account_id, audio_url, description
    const name = creator ? creator.name : "";
    const subscriptions = options.subscriptions ? options.subscriptions : [];
    
    const sub2This = subscriptions.filter((sub)=> {
        console.log(sub.creator_id, ' vs ', entry.creator._id, ".  also: ", sub.playlist_id);
         return ((sub.creator_id === entry.creator._id)&&(!sub.playlist_id))
    });
    const subText = sub2This.length ? (sub2This[0].status === "approved" ? "subscribed" : "pending") : "";
                        //const status = (matchedSub && matchedSub.length) ? matchedSub.status === "approved" ? "subscribed" : "pending" : ""
    const ProfileIcoArray = [{ //* adds profile icon to any profile! :)
        Icon: AccountBoxIcon,
        pre: true,
    }, ...IcoArray];
    const opts = {  wrapperClass : "profileItemWithPre", ...options }

    return(<LinkCapsule to = { to } IcoArray = { ProfileIcoArray } menu = { menu } 
    classy = "link" options = { opts } entry = { entry } >
        <>
            <div className='storyItemTop' >
                <h3 className="storyItemTitle">{ name }</h3>
                <p className="storyItemAuthor">{ about_me }</p>
                <p className="storyItemAuthor">{ subText }</p>
            </div>
        </>
    </LinkCapsule>);
}