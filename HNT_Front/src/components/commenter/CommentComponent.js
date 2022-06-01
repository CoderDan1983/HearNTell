import Comments from './comments/Comments';
import './comment.css';
const CommentComponent = () => {
  return(
    <div>
      <h1>Let's Talk about it</h1>
      <Comments currentUserId="1" />
    </div>
  );
};

export default CommentComponent;
