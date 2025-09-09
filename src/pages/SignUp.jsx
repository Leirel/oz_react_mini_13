import React, { useState } from "react";
import FormInput from "../components/FormInput";

export default function SignUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!/^[a-zA-Z0-9가-힣]{2,8}$/.test(form.name)) {
            newErrors.name = "이름은 2~8자의 한글/영문/숫자만 가능합니다.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "올바른 이메일 형식을 입력하세요.";
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(form.password)) {
            newErrors.password = "비밀번호는 대소문자+숫자를 포함한 6자 이상이어야 합니다.";
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("회원가입 성공", form);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">회원가입</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="이름"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="이름을 입력하세요"
                    error={errors.name}
                />
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
                <FormInput
                    label="비밀번호 확인"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="비밀번호를 다시 입력하세요"
                    error={errors.confirmPassword}
                />

                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}
