import { post_private, delete_private } from './useBackendRequest';

export function playlistsMenu({ nav, loc, axP }, rawPlaylists = [], story, subscriptions, is_creator_list){
    let playlists = [];
    
    rawPlaylists
        .sort()
        .filter((list)=> list.is_creator_list === is_creator_list)
        .forEach((playlist)=> {
            const play_subbed = followingPlaylist(playlist);            
            playlists.push({ //* creator, listener
                title: `Remove ${ playlist.title } playlist`,
                playlist,
                handleClick: handleRemovePlaylist,
            });

            //* if a "subscribed" listener with a status of approved or pending, deal with accordingly.
            !is_creator_list && play_subbed.length && 
            play_subbed[0].status !== "rejected" &&
            playlists.push({ //*listener
                title: play_subbed[0].status === "approved" ? 
                    `Unsubscribe from ${ playlist.title }` : 
                    `Cancel Subscription Request to ${ playlist.title }`,
                info: { subscription_id: play_subbed[0]._id }, //playlist
                handleClick: handleDeleteSubscription,
            });
            //* if a listener and "non subscribed", give option to subscribe
            !is_creator_list && !play_subbed.length && 
            playlists.push({ //*listener
                title: `Subscribe to ${ playlist.title }`,
                //* req.user will be available on server ^_^ 
                info: { creator_id: playlist.creator_id, playlist_id: playlist._id, }, //playlist
                handleClick: handleCreateSubscriptionRequest,
            });
        });

    const followCreator = (subscriptions && subscriptions.length) && 
        subscriptions.filter((sub)=> sub.creator_id === story.creator._id);
    const is_following_creator = (followCreator && followCreator.length) ? true : false;

    //* if not subscribed, offer the opportunity to subscribe
    !is_creator_list && (!is_following_creator) && playlists.push({
        title: `Subscribe to ${story?.creator?.name}`,
        handleClick: handleCreateSubscriptionRequest,
    });

    //* if "subscribed" and not rejected, offer opportunity to cancel request ^_^
    !is_creator_list && is_following_creator && 
    (followCreator[0].status !== "rejected") &&
    playlists.push({
        title: followCreator[0].status === "approved" ? 
            `Unsubscribe from ${ followCreator[0].creator.name }` :    
            `Cancel Subscription Request to ${ followCreator[0].creator.name }`,
        handleClick: handleCreateSubscriptionRequest,
    }); 

    let playlistStarter = [...playlists];

    function handleCreateSubscriptionRequest(event, index, payload){ //user_id, creator_id, playlist_id
        post_private(axP, nav, loc, 'subscription/', { payload }); //* listener
    }

    function handleDeleteSubscription(event, index, { subscription_id }){ //* creator, listener
        delete_private(axP, nav, loc, 'subscription/', { _id: subscription_id });
    }

    function handleRemovePlaylist(event, index, { playlist_id }){
        alert('line 5!  playlist_id is: ', playlist_id)

        delete_private(axP, nav, loc, `playlist/${ playlist_id }`, { });
    }

    function followingPlaylist(playlist){
        return subscriptions.filter((sub) => sub.playlist_id === playlist._id);
    }

    // subscriptions.some((sub)=> playlists.some((play) => sub.playlist_id === play._id));

    return playlistStarter;
}
export function storyMenu({ nav, loc, axP, goTo }, rawPlaylists = [], story, is_creator_list){
    const { _id: story_id } = story;

    function queueFirst(a, b){
        return b.playlist.is_queue - a.playlist.is_queue;
    }

    function handleAddToPlaylist(event, index, { general }){
        const option = general[index];
        const { playlist } = option;
        //console.log('handleAddToPlaylist', 'event: ', event, 'option: ', option, 'story: ', story, 'story_id: ', story._id, 'playlist: ', playlist);
        
        post_private(axP, nav, loc, `playlist/${ playlist._id }/story/${ story_id }`, { payload: playlist, goTo });
    }
    function handleRemoveFromPlaylist(event, index, { general }){
        const option = general[index];
        const { playlist } = option;
        //console.log('handleRemoveFromPlaylist', 'event: ', event, 'option: ', option, 'story: ', story, 'story_id: ', story._id, 'playlist: ', playlist);
        
        delete_private(axP, nav, loc, `playlist/${ playlist._id }/story/${ story_id }`, { payload: playlist, goTo });
    }
    function handleEditStory(event, index, { general }){
        //const option = general[index];
        //console.log('handleEditStory', 'event: ', event, 'option: ', option, 'story: ', story, 'story_id: ', story._id);
        nav(`/creatorEditStory/${story_id}`, { state: { from: loc }, replace: true });
    }
    function handleDeleteStory(event, index, { general }){
        const option = general[index];
        const { playlist } = option;
        //console.log('handleDeleteStory', 'event: ', event, 'option: ', option, 'story: ', story, 'story_id: ', story._id, 'playlist: ', playlist);
        delete_private(axP, nav, loc, 'story', { _id: story_id, payload: playlist, goTo });
    }

    // function handleDeleteSubscriptionRequest(event, index, { subscription_request_id }){ //* creator / listener
    //     delete_private(axP, nav, loc, 'subscription/request', { _id: subscription_request_id });
    // }

    // function handleCancelSubscriptionRequest(event, index, { subscription_id }){   
    //     delete_private(axP, nav, loc, 'subscription/request', { _id: subscription_id });
    // }

    const playlists = rawPlaylists
        .filter((list)=> list.is_creator_list === is_creator_list)
        .map((playlist)=> {            
            const included = playlist.story_ids.includes(story_id);
            return {
                title: included ? `Remove from ${ playlist.title }` : `Add to ${ playlist.title }`,
                playlist,
                handleClick: included ? handleRemoveFromPlaylist : handleAddToPlaylist,
            }  
        });

    // let playlists = [];
    // rawPlaylists
    // .filter((list)=> list.is_creator_list === is_creator_list)
    // .forEach((playlist)=> {            
    //     const included = playlist.story_ids.includes(story_id);
    //     playlists.push({
    //         title: included ? `Remove from ${ playlist.title }` : `Add to ${ playlist.title }`,
    //         playlist,
    //         handleClick: included ? handleRemoveFromPlaylist : handleAddToPlaylist,
    //     }) ;
    // });

    playlists.sort(queueFirst); //make sure queue is at the top of the list :)
    let starter = [...playlists];

    is_creator_list && starter.push({ title: "edit", handleClick: handleEditStory });
    is_creator_list && starter.push({ title: "delete", handleClick: handleDeleteStory });
    // starter.params = {};

    return starter;
}

export function subscriberMenu({ nav, loc, axP }, rawSubscriptions = [{}], thisSubscription, is_creator){
    let subStarter = [];
    function handleRemovePlaylist(event, index, { playlist_id }){
        alert('line 5!  playlist_id is: ', playlist_id)

        delete_private(axP, nav, loc, `playlist/${ playlist_id }`, { });
    }

    const subscriptions = rawSubscriptions
        .filter((sub)=> {
            if(is_creator) return true; //* creators see sub regardless of status!
            if(sub.status === "approved") return true; //* subscriptions that have been approved are seen by all.
            return false;
        })
        .forEach((subscription)=> {
            if(is_creator){
                if(subscription.status !== "approved"){
                    subStarter.push({
                        title: `Approve ${ subscription.listener_id.name }`,
                        handleClick: handleApproveSubscriptionRequest, 
                    });
                }
                else if(subscription.status !== "rejected"){
                    subStarter.push({
                        title: `Reject ${ subscription.listener_id.name }`,
                        handleClick: handleDeleteSubscription, 
                    });
                }
            }
            else{ //* for users ^_^
                if(subscription.status === "approved"){
                    subStarter.push({
                        title: `Unsubscribe from ${ subscription.creator.name }`,
                        handleClick: handleDeleteSubscription, 
                    });
                }
                else if(subscription.status !== "rejected"){
                    subStarter.push({
                        title: `Reject ${ subscription.listener_id.name }`,
                        handleClick: handleDeleteSubscription, 
                    });
                }
            }
            //return {
            //     ...obj, //title: !is_creator ? `Subscribe to ${ subscription.creator.name }`,
            //     subscription,
            //     handleClick: handleRemovePlaylist,
            // }  
        });

    is_creator && subscriptions.sort((a,b)=>{ //* pending on top!
        return subSorter(a) - subSorter(b);
    })

    function subSorter(entry){
        switch(entry.status){
            case "approved":
                return 1;
            break;

            case "pending":
                return 0;
            break;

            case "rejected":
                return 2;
            break;

            default:
                return 0;
            break;
        }
    }

    function handleDeleteSubscription(event, index, { subscription_id }){ //* creator, listener
        delete_private(axP, nav, loc, 'subscription/', { _id: subscription_id });
    }
    
    function handleApproveSubscriptionRequest(event, index, { subscription_request_id }){  //* creator
        post_private(axP, nav, loc, `/request/${subscription_request_id}/approve`);
    }

    // playlists.sort();
    // let starter = [...playlists];

    return subStarter;
}


