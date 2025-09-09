import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSupabaseContext } from "../context/SupabaseContext.jsx";

export default function NavBar({ isDarkMode, toggleDarkMode }) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    const { userInfo, logout } = useSupabaseContext();

    useEffect(() => {
        if (debouncedSearch.trim()) {
            navigate(`/search?query=${debouncedSearch}`);
        }
    }, [debouncedSearch, navigate]);

    return (
        <header
            className={`px-6 py-4 flex items-center justify-between shadow-md
            transition-colors duration-700 ease-in-out
            ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-black"}`}
        >
            <div className="flex items-center gap-2 text-xl font-bold">
                <span role="img" aria-label="logo">🎬</span>
                <Link to="/">영화 정보</Link>
            </div>

            <div className="flex-1 mx-6 max-w-md">
                <input
                    type="text"
                    placeholder="영화를 검색하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full px-4 py-2 rounded-md border
                        transition-colors duration-700 ease-in-out
                        ${isDarkMode 
                            ? "bg-gray-800 text-white border-gray-600 focus:ring-red-600"
                            : "bg-gray-200 text-black border-gray-400 focus:ring-red-600"}`}
                />
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleDarkMode}
                    className={`px-3 py-1 border rounded text-sm
                        transition-colors duration-700 ease-in-out
                        ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
                >
                    {isDarkMode ? "Light" : "Dark"}
                </button>

                {userInfo ? (
                    <div className="relative">
                        <img
                            src={userInfo.profileImageUrl || "/default-profile.png"}
                            alt="profile"
                            className="w-8 h-8 rounded-full cursor-pointer"
                        />
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded shadow-md p-2 text-sm hidden group-hover:block">
                            <Link to="/mypage" className="block py-1 hover:text-red-600">마이 페이지</Link>
                            <button
                                onClick={() => logout()}
                                className="w-full text-left py-1 hover:text-red-600"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                        >
                            로그인
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
                        >
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
