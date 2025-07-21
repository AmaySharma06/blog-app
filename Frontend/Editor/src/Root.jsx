import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

function Root() {
    
    return (
        <div className="Root">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Root;