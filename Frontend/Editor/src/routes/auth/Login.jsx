import { Form } from "react-router-dom";
import '../../styles/Login.css'

function Login() {
    localStorage.clear();

    return (
        <div className="Login">
            <div className="Login-form-container">
                <h1>Login</h1>
                <Form method="post">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username"/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password"/>
                    <button type="submit">Log In</button>
                </Form>
            </div>
        </div>
    )
}

export default Login;