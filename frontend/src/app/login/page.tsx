"use client";

import { useState } from "react";
import * as React from "react";
import { redirect } from "next/navigation";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPasswrod] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
    setFormError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError("");
    setFormError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!email || !password) {
      return;
    }
    const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      alert("Login successful");
      redirect("/");
    } else {
      const { detail } = await response.json();
      setFormError(detail);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg min-w-72">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-describedby="form-error"
        >
          <legend className="text-black font-extrabold text-2xl py-2">
            Please Login first.
          </legend>
          <div id="form-error" className="text-red-600 my-2 w-full text-center">
            {formError}
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-black text-base font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              aria-describedby="email-error"
            />
            <p id="email-error" className="text-red-600 mt-1">
              {emailError}
            </p>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="text-black text-base font-bold"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                aria-describedby="password-error"
              />
              <span
                className="absolute top-1/3 right-2 text-2xl"
                onClick={() => setShowPasswrod(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <p id="password-error" className="text-red-600 mt-1">
              {passwordError}
            </p>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full text-xl font-bold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
