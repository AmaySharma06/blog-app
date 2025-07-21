import { Form, useLoaderData } from "react-router-dom";
import { useState } from "react";

function BlogEditor() {
    const blogData = useLoaderData();
    const [heading, setHeading] = useState(blogData ? blogData.heading : '');
    const [content, setContent] = useState(blogData ? blogData.content : '');

    return (
        <div className="BlogEditor">
            <Form method="POST">
                <input name="heading" value={heading} onChange={(e)=>setHeading(e.target.value)} />
                <textarea name="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export default BlogEditor;