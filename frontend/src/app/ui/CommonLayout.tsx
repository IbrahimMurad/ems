import React from "react";

export default function CommonLayout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-50 text-purple-600 p-4">
        <h1 className="text-xl font-extrabold">{pageTitle}</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}
