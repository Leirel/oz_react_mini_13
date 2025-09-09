import React from "react";

export default function FormInput({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
}) {
    return (
        <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
