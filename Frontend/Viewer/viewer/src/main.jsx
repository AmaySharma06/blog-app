import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from './Root.jsx'
import './index.css'
import { loginAction, signUpAction } from './routes/auth/authutils.js'
import Login from './routes/auth/Login.jsx'
import Home from './routes/Home.jsx'
import BlogShow from './routes/BlogShow.jsx'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login msg={"Log In"}/>,
    action: loginAction
  },
  {
    path: 'signup',
    element: <Login msg={"Sign Up"}/>,
    action: signUpAction
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        loader: async () => {
          const blogIDsRes = await fetch(`${API_BASE_URL}/blogs`);
          const blogIDsJson = await blogIDsRes.json();

          const blogPromises = blogIDsJson.map(({ blogID }) =>
            fetch(`${API_BASE_URL}/blogs/${blogID}`).then(res => res.json())
          );
          const blogs = await Promise.all(blogPromises);

          return blogs;
        },
        element: <Home />
      },
      {
        path: ':blogID',
        element: <BlogShow />,
        loader: async ({params}) => {
          const res = await fetch(`${API_BASE_URL}/blogs/${params.blogID}`, {
            headers: {
              'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (!res.ok) {
            console.log(res);
            throw new Response("Not Found", { status: 404 });
          }

          const commentsRes = await fetch(`${API_BASE_URL}/blogs/${params.blogID}/comments`, {
            headers: {
              'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
          })

          const commentsJson = await commentsRes.json();
          const blogData = await res.json();
      
          return {...blogData, comments: commentsJson.comments};
        },
        action: async({params, request}) => {
          const formData = await request.formData();
          const content = formData.get("content");

          const res = await fetch(`${API_BASE_URL}/blogs/${params.blogID}/comments`, {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({content})
          });

          if (res.ok) {
            alert("Comment added successfully!");
            window.location.reload();
          }
        }
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
