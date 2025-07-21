import CommentEditor from "./CommentEditor";
import CommentCard from "./CommentCard";
import "../../styles/Comments.css"

function CommentSection({blogID, comments}) {

    return (
        <div className="CommentSection">
            <CommentEditor blogID={blogID}/>
            {comments.map(comment => <CommentCard key={comment.commentID} commentData={comment}/>)}
        </div>
    )
}

export default CommentSection;