import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import "./style.css";
import SearchPage from "./pages/SearchPage.jsx";


function AppWrapper() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
                    <Route index element={<Home isDarkMode={isDarkMode} />} />
                    <Route path="details/:id" element={<MovieDetail isDarkMode={isDarkMode} />} />
                    <Route path="search" element={<SearchPage isDarkMode={isDarkMode} />} />
=======
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="details/:id" element={<MovieDetail />} />
                    <Route path="search" element={<SearchPage />} />
>>>>>>> ccd48814a291c023a58615c1ac70435e29754ba4
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);
