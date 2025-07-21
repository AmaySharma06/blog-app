import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <div className="nav-left">
                <h1>Blog Publisher</h1>
            </div>
            <div className="nav-middle">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/new'>New Blog</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
            </div>
            <div className="nav-right">
                <h2>{localStorage.getItem("username")}</h2>
                <NavLink to='/login'><button>Logout</button></NavLink>
            </div>
        </nav>
    )
}

export default NavBar;