import { Form } from "react-router-dom";

function CommentEditor() {

    return (
        <div className="CommentEditor">
            <Form method="POST">
                <textarea required name="content" placeholder="Add a comment..."></textarea>
                <button type="submit">Post</button>
            </Form>
        </div>
    )
}

export default CommentEditor;