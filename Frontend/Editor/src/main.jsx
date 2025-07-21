import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import Root from './Root.jsx'
import Home from './routes/Home.jsx'
import BlogEditor from './routes/BlogEditor.jsx'
import Login from './routes/auth/Login.jsx'
import {adminLoader, loginAction} from './routes/auth/authutils.js'
import { editAction, newAction } from './routes/apiutils.js'
import Profile from './routes/Profile.jsx'
import './index.css'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
    action: loginAction
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        loader: async () => {
          const user = await adminLoader();
          if (user.userID) {
            const blogs = user.blogs;
            return blogs;
          }
          else {
            console.log(user);
            return redirect('/login')
          }
        },
        element: <Home />
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: async () => {
          const user = await adminLoader();
          if (!user.userID) {
            return redirect('/login');
          }
          
          return user;
        }
      },
      {
        path: 'new',
        element: <BlogEditor />,
        action: newAction
      }, 
      {
        path: ':blogID',
        element: <BlogEditor />,
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

          const blogData = await res.json();
          return blogData;
        },
        action: editAction
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
