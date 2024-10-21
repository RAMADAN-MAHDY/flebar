"use client"

import { useState } from "react";

const LoginForm = ({getkey}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch('https://flebarapi.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // تسجيل الدخول بنجاح
        alert("Login successful");
        localStorage.setItem("email",email);
        localStorage.setItem('isLoggedIn', true);
        // key show data in home//
        getkey(true) 
        // إعادة تعيين الحقول
        setEmail("");
        setPassword("");
        // إعادة التوجيه أو تنفيذ إجراء آخر بعد تسجيل الدخول بنجاح
      } else {
        // فشل تسجيل الدخول
        setError(result.message || "Failed to login");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            البريد الإلكتروني
          </label>
          <input
           type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
