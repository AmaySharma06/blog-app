import { redirect } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function blogEdit(blogID, request, isNew) {
    let formData = await request.formData();
    const heading = formData.get('heading');
    const content = formData.get('content');

    const res = await fetch(`${API_BASE_URL}/blogs/${blogID || ''}`, {
        method: (isNew ? 'POST' : 'PUT'),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({heading, content})
    })

    if (!res.ok) {
        console.log(res);
        console.log(`${API_BASE_URL}/blogs/${blogID || ''}`);
        alert("Something went wrong");
        return;
    }   

    alert("Action Successful");
    return redirect('/');
}

async function newAction({request}) {
    return await blogEdit(null, request, true);
} 

async function editAction({params, request}) {
    return await blogEdit(params.blogID, request, false);
}

export {newAction, editAction};