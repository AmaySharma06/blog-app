import { useLoaderData } from "react-router-dom";
import BlogCard from "../components/BlogCard";


function Home() {
    const blogs = useLoaderData();

    return (
        <div className="Home">
            <h1>Welcome, {localStorage.getItem("username")}</h1>
            <ul>
                {
                    blogs && blogs.map((blog) => <BlogCard key={blog.blogID} blogData={blog} />)
                }
            </ul>
        </div>
    )
}

export default Home;