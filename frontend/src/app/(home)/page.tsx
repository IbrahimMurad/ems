"use client";

import * as React from "react";
import { redirect } from "next/navigation";

export default function HomePage() {
  return (
    <div className="grid place-items-center bg-white p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg min-w-72">
        <h1 className="text-2xl font-semibold text-center">
          Welcome to the home page
        </h1>
        <p className="text-center mt-4">
          You are currently viewing the home page
        </p>
        <button
          onClick={() => redirect("/login")}
          className="block w-full bg-slate-900 text-white rounded-lg py-2"
        >
          Go to login page
        </button>
      </div>
    </div>
  );
}
