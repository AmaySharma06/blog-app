import { useLoaderData } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import "../styles/Home.css"

function Home() {
    const blogs = useLoaderData();

    return (
        <div className="Home">
            <h1>All Blogs</h1>
            <ul>
                {
                    (blogs && blogs.length && blogs.map((blog) => <BlogCard key={blog.blogID} blogData={blog} />) || "No blogs yet :(")
                }
            </ul>
        </div>
    )
}

export default Home;