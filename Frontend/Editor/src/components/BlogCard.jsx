import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

async function handleDelete(blogID) {
    const res = await fetch(`${API_BASE_URL}/blogs/${blogID}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!res.ok) {
        console.log(res);
        alert("Something went wrong");
        return;
    }   

    alert("Blog Deleted successfully!");
    window.location.reload();
}

function BlogCard({blogData}) {

    return (
        <li className="BlogCard">
            <div className="BlogCard-content">
                <h2>{blogData.heading}</h2>
                <p>{blogData.content}</p>
                <span>Created: {new Date(blogData.created).toLocaleString()}</span>
            </div>
            <div className="BlogCard-buttons">
                <Link to={`/${blogData.blogID}`}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Link>
                <Link onClick={() => handleDelete(blogData.blogID)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Link>
            </div>
        </li>
    )
}

export default BlogCard;