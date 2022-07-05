import { post_private, delete_private } from './useBackendRequest';

export function createPlaylistMenu({ nav, loc, axP, goTo }, rawPlaylists = [], story, is_creator){
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

    const playlists = rawPlaylists.map((playlist)=> {
        const included = playlist.story_ids.includes(story_id);
        return {
            title: included ? `Remove from ${ playlist.title }` : `Add to ${ playlist.title }`,
            playlist,
            handleClick: included ? handleRemoveFromPlaylist : handleAddToPlaylist,
        }
    });

    playlists.sort(queueFirst); //make sure queue is at the top of the list :)
    let starter = [...playlists];

    is_creator && starter.push({ title: "edit", handleClick: handleEditStory });
    is_creator && starter.push({ title: "delete", handleClick: handleDeleteStory });
    // starter.params = {};

    return starter;
}