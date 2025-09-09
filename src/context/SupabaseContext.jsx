import React, { createContext, useContext, useEffect, useState } from "react";
import { useSupabaseAuth } from "../supabase/useSupabaseAuth";

const SupabaseContext = createContext();

export function SupabaseProvider({ children }) {
    const { getUserInfo, login, signUp, logout } = useSupabaseAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userInfo = await getUserInfo();
                if (userInfo) {
                    setUser(userInfo);
                }
            } catch (err) {
                console.error("유저 정보를 가져오는 중 오류:", err);
            }
        };
        fetchUser();
    }, [getUserInfo]);

    return (
        <SupabaseContext.Provider value={{ user, setUser, login, signUp, logout }}>
            {children}
        </SupabaseContext.Provider>
    );
}

export function useSupabaseContext() {
    return useContext(SupabaseContext);
}
