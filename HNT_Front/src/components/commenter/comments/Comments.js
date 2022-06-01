import { useState, useEffect } from "react";

import { 
    getComments as getCommentsApi, 
    createComment as createCommentApi, 
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi, 
} from '../api';

import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter((backendComment)=>{ 
        return backendComment.parentId === null;
    });

    const getReplies = commentId => {
        return backendComments.filter((backendComment)=> backendComment.parentId === commentId).
        sort((a,b)=> new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };
    
    const addComment = (text, parentId) => {
        console.log("addComment", text, parentId);
        createCommentApi(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    }

    const deleteComment = (commentId) =>{
        if(window.confirm('Are you sure that you want to remove comment?')){
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments);
            });
        }
    }

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if(backendComment.id === commentId){
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    }

    useEffect(()=>{
        getCommentsApi().then((data)=>{
            setBackendComments(data);
        });
    },[]);

    return(
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write Comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment}/>
            <div className="comments-container">
                {rootComments.map(rootComment => (
                    <Comment 
                        key={rootComment.id} 
                        comment={rootComment} 
                        replies={getReplies(rootComment.id)} //* interesting I can get by with this :D
                        // if you have a lot of comments (ie-large applications(?)), try lazy loading?
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        addComment={addComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        
                    />
                ))}
            </div>
        </div>
    );
};
  
  export default Comments;