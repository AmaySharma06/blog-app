import { Form } from "react-router-dom";

function Login() {
    localStorage.clear();
    
    return (
        <div className="Login">
            <h2>Login</h2>
            <Form method="post">
                <label htmlFor="username">Username</label>
                <input id="username" name="username"/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"/>
                <button type="submit">Login</button>
            </Form>
        </div>
    )
}

export default Login;