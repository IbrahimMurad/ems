import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}
