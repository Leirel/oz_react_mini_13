import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext();

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabaseContext = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;

            if (!session) {
                setUserInfo(null);
                return null;
            }

            const { user } = session;
            const storedUser = localStorage.getItem("userInfo");
            if (storedUser) {
                setUserInfo(JSON.parse(storedUser));
            } else {
                const userData = {
                    id: user.id,
                    email: user.email,
                    userName: user.user_metadata?.userName || "",
                    profileImageUrl: user.user_metadata?.profileImageUrl || "",
                };
                localStorage.setItem("userInfo", JSON.stringify(userData));
                setUserInfo(userData);
            }
            return user;
        } catch (error) {
            console.error("유저 정보를 가져오는 중 오류:", error);
            setUserInfo(null);
            return null;
        }
    };

    const signUp = async ({ email, password, userName }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { userName },
            },
        });
        if (error) throw error;
        return data;
    };

    const login = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await getUserInfo();
        return data;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        localStorage.removeItem("userInfo");
        setUserInfo(null);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <SupabaseContext.Provider value={{ userInfo, getUserInfo, signUp, login, logout }}>
            {children}
        </SupabaseContext.Provider>
    );
};
