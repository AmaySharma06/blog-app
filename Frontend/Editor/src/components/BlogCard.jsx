import { Link } from "react-router-dom";

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
            <h2>{blogData.heading}</h2>
            <p style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", WebkitLineClamp: 3}}>{blogData.content}</p>
            <i>{new Date(blogData.created).toLocaleString()}</i>
            <div>
                <Link to={`/${blogData.blogID}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(blogData.blogID)}>Delete</button>
            </div>
        </li>
    )
}

export default BlogCard;