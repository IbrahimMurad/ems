import * as React from "react";
import NavBar from "../ui/NavBar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <NavBar />
      </div>
      <div className="grow p-4 md:p-8 md:overflow-y-auto">{children}</div>
    </div>
  );
}
