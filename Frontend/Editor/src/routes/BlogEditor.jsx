import { Form, Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import '../styles/BlogEditor.css'

function BlogEditor() {
    const blogData = useLoaderData();
    const [heading, setHeading] = useState(blogData ? blogData.heading : '');
    const [content, setContent] = useState(blogData ? blogData.content : '');

    return (
        <div className="BlogEditor">
            <Form method="POST">
                <div>
                    <h2>Heading: </h2>
                    <input name="heading" value={heading} onChange={(e)=>setHeading(e.target.value)} />
                    <div className="BlogEditor-buttons">
                        <button type="submit">Submit</button>
                        <Link to='/'>Back</Link>
                    </div>
                </div>
                <textarea name="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
            </Form>
        </div>
    )
}

export default BlogEditor;