import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function Layout({ isDarkMode, toggleDarkMode }) {
    return (
        <div className={`min-h-screen transition-colors duration-700 ease-in-out
            ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-black"}`}>
            <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <main className="p-4 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}
