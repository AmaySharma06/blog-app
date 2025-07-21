import { Form, Link } from "react-router-dom";
import '../../styles/Login.css'

function Login({msg}) {
    localStorage.clear();

    return (
        <div className="Login">
            <div className="Login-form-container">
                <h1>{msg}</h1>
                <Form method="post">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username"/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password"/>
                    <button type="submit">{msg}</button>
                </Form>
                <div>
                    <span>{msg == 'Log In' ? "Don't h": "H"}ave an account? </span>
                    <Link to={msg == 'Log In' ? '/register' : '/login'}>{msg == 'Log In' ? "Sign Up": "Log In"}</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;