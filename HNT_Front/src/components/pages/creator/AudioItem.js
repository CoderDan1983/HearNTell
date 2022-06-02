import { useState } from 'react'

const AudioItem = ({ title, id }) => {
    
    function handleDelete(){
        console.log('deleting ' , id);
    }
    function handleEdit(){
        console.log('editing ' , id);
    }
    return (
        <div>
            <div>{ title }</div>
            <button onClick={ (e)=> handleEdit() }>Edit</button>
            <button onClick={ (e) => handleDelete() }>Delete</button>
        </div>
    )
}

export default AudioItem;