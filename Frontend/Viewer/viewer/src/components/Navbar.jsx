import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'

function NavBar() {
    return (
        <nav>
            <div className="nav-left">
                <h2>Amay's Blog</h2>
            </div>
            <div className="nav-middle">
                <NavLink to='/'>Home</NavLink>
                <a href="https://github.com/AmaySharma06/blog-app" target="blank">GitHub</a>
            </div>
            
            {localStorage.getItem("username") ? (
                <div className="nav-right">
                    <span>{localStorage.getItem("username")}</span>
                    <NavLink to='/'><button onClick={() => {localStorage.clear()}}>Log Out</button></NavLink>
                </div>
            ) : (
                <div className="nav-right">
                    <NavLink to='/signup'><button>Sign Up</button></NavLink>
                    <NavLink to='/login'><button>Log In</button></NavLink>
                </div>
            )}
        </nav>
    )
}

export default NavBar;