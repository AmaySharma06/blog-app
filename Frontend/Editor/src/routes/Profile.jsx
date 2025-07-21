import { useLoaderData } from "react-router-dom";

function Profile() {
    const user = useLoaderData();

    return (
        <div className="Profile">
            <h1>Username : {user.username}</h1>
            <h2>Blogs Published: {user.blogs.length}</h2>
        </div>
    )
}

export default Profile;