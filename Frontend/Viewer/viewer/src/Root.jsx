import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

function Root() {
    
    return (
        <div className="Root">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Root;