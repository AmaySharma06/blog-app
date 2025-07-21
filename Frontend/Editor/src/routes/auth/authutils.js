import { redirect } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function getCurrentUser() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
        const res = await fetch(`${API_BASE_URL}/users/@me`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) return null;
        const jsonRes = await res.json();
        return {...jsonRes.user, blogs: jsonRes.blogs};
    }
    catch {
        return null;
    }
}

async function adminLoader() {
    const user = await getCurrentUser();
    if (!user || !user.isAdmin) {
        return redirect('/login');
    }
    return user;
}

async function loginAction({request}) {
    let formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    const res = await fetch(`${API_BASE_URL}/login`, {
        method : "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    if (!res.ok) {
        localStorage.removeItem('token');
        throw new Error('Login Failed');
    }

    const data = await res.json();
    const token = data.token;

    localStorage.setItem("token", token);

    const user = await adminLoader();

    if (!user.userID) { // Executes when user is not returned and response object doesn't have a userID
        localStorage.removeItem('token');
        throw new Error('Not Admin');
    }

    localStorage.setItem("username", user.username);
    return redirect('/');
}

export {adminLoader, loginAction};