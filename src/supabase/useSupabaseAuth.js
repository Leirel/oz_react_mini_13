import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function useSupabaseAuth() {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("userInfo");
        return stored ? JSON.parse(stored) : null;
    });

    const signUp = async ({ email, password, userName }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { userName }
            }
        });

        if (error) throw error;
        return data;
    };

    const login = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;

        await getUserInfo();
        return data;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        localStorage.removeItem("userInfo");
    };

    const getUserInfo = async () => {
        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;
            if (!session) {
                setUser(null);
                localStorage.removeItem("userInfo");
                return null;
            }

            const { data: { user: supaUser }, error } = await supabase.auth.getUser();
            if (error) throw error;

            const userData = {
                id: supaUser.id,
                email: supaUser.email,
                userName: supaUser.user_metadata?.userName || "",
                profileImageUrl: supaUser.user_metadata?.profileImageUrl || "",
            };

            setUser(userData);
            localStorage.setItem("userInfo", JSON.stringify(userData));
            return userData;
        } catch (err) {
            console.error("유저 정보를 가져오는 중 오류:", err);
            setUser(null);
            localStorage.removeItem("userInfo");
            return null;
        }
    };

    return { user, signUp, login, logout, getUserInfo };
}
