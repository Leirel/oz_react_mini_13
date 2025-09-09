import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useSupabaseContext } from "../context/SupabaseContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const { login, setUser } = useSupabaseContext();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = "이메일을 입력하세요.";
        if (!form.password) newErrors.password = "비밀번호를 입력하세요.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await login({ email: form.email, password: form.password });
            if (res?.user) {
                setUser(res.user);
                navigate("/");
            } else if (res?.error) {
                alert(res.error.message);
            }
        } catch (err) {
            console.error("로그인 실패:", err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">로그인</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="이메일"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="이메일을 입력하세요"
                    error={errors.email}
                />
                <FormInput
                    label="비밀번호"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="비밀번호를 입력하세요"
                    error={errors.password}
                />

                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}
