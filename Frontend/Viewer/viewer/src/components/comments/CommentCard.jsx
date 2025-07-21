import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function getAuthor(authorID) {
    const res = await fetch(`${API_BASE_URL}/users/${authorID}`);
    const resJson = await res.json();
    const user = resJson.user;
    return user.username;
}

function CommentCard({commentData}) {
    const [user,setUser] = useState('');

    useEffect(() => {
        getAuthor(commentData.authorID).then(name => setUser(name));
    }, [commentData.authorID]); 

    return (
        <div className="CommentCard">
            <div className="CommentCard-top">
                <span className="CommentCard-user">{user}</span>
                <span className="CommentCard-date">{new Date(commentData.created).toLocaleString()}</span>
            </div>
            <div>
                {commentData.content}
            </div>
        </div>
    )

}

export default CommentCard;