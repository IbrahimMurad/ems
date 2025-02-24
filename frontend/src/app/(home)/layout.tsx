import * as React from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex flex-col md:flex-row h-screen min-w-72">
        <div className="flex flex-col md:w-1/4 bg-purple-100 text-white md:max-w-72 md:min-w-48">
          <div className="flex p-4 bg-purple-900 text-white md:rounded-br-3xl">
            <p className="font-extrabold text-4xl font-sans md:mt-16">E M S</p>
            <span className="ml-auto md:hidden">
              <button className="text-purple-900 font-bold py-2 px-4 bg-purple-50 w-fit rounded-lg shadow-md cursor-pointer md:w-full text-center hover:bg-white hover:scale-105">
                Logout
              </button>
            </span>
          </div>
          <nav className="grow p-2 text-purple-900 font-bold mt-0 md:mt-4">
            <ul className="h-full flex flex-wrap gap-2 justify-around items-center md:flex-col md:justify-start md:items-start">
              <li className="py-2 px-4 bg-purple-50 w-fit rounded-lg shadow-md cursor-pointer md:w-full text-center hover:bg-white hover:scale-105">
                Companies
              </li>
              <li className="py-2 px-4 bg-purple-50 w-fit rounded-lg shadow-md cursor-pointer md:w-full  text-center hover:bg-white hover:scale-105">
                Departments
              </li>
              <li className="py-2 px-4 bg-purple-50 w-fit rounded-lg shadow-md cursor-pointer md:w-full text-center hover:bg-white hover:scale-105">
                Employees
              </li>
              <li className="mt-auto mb-16 w-full hidden md:block">
                <button className="py-2 px-4 bg-purple-50 w-fit rounded-lg shadow-md cursor-pointer md:w-full text-center hover:bg-white hover:scale-105">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="grow">{children}</div>
      </main>
    </>
  );
}
