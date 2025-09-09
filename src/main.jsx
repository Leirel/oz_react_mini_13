import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { SupabaseProvider } from "./context/SupabaseContext.jsx";
import "./style.css";

function AppWrapper() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
                    <Route index element={<Home isDarkMode={isDarkMode} />} />
                    <Route path="details/:id" element={<MovieDetail isDarkMode={isDarkMode} />} />
                    <Route path="search" element={<SearchPage isDarkMode={isDarkMode} />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SupabaseProvider>
            <AppWrapper />
        </SupabaseProvider>
    </React.StrictMode>
);
