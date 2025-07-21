import { useLoaderData, NavLink } from "react-router-dom";
import CommentSection from "../components/comments/CommentSection";
import "../styles/BlogShow.css"

function BlogShow() {
    const blog = useLoaderData();

    return (
        <div className="BlogShow">
            <h1 className="BlogShow-heading">
                {blog.heading}
            </h1>
            <p className="BlogShow-content"> 
                {blog.content}
            </p>
            {localStorage.getItem("token") ? <CommentSection blogID={blog.blogID} comments={blog.comments}/> : <div>                    <NavLink to='/login'>Log In</NavLink> to comment</div> }
        </div>
    )
}

export default BlogShow;