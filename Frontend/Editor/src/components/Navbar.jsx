import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'

function NavBar() {
    return (
        <nav>
            <div className="nav-left">
                <h2>Blog Publisher</h2>
            </div>
            <div className="nav-middle">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/new'>New Blog</NavLink>
                <a href="https://github.com/AmaySharma06/blog-app" target="blank">GitHub</a>
            </div>
            <div className="nav-right">
                <span>{localStorage.getItem("username")}</span>
                <NavLink to='/login'><button>Log Out</button></NavLink>
            </div>
        </nav>
    )
}

export default NavBar;