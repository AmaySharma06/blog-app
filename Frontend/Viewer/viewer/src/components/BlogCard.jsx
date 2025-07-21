import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function getAuthor(authorID) {
    const res = await fetch(`${API_BASE_URL}/users/${authorID}`);
    const resJson = await res.json();
    const user = resJson.user;
    return user.username;
}

function BlogCard({blogData}) {
    const [user,setUser] = useState('');

    useEffect(() => {
        getAuthor(blogData.authorID).then(name => setUser(name));
    }, [blogData.authorID]); 

    return (
        <li className="BlogCard">
            <Link to={`/${blogData.blogID}`}>
                <div className="BlogCard-content">
                    <h2>{blogData.heading}</h2>
                    <p>{blogData.content}</p>
                    <div>
                        <span>By: {user}</span>
                        <span>Created: {new Date(blogData.created).toLocaleString()}</span>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default BlogCard;