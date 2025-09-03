import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
    return (
        <div className="min-h-screen bg-[#242424] text-white">
            <NavBar />
            <main className="p-4 bg-[#242424] min-h-screen text-white">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
