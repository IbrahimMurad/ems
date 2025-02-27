"use client";

import Link from "next/link";
import { PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { employee } from "@/app/lib/definitions";
import { statusStyles } from "@/app/lib/definitions";

export default function EmployeeDetails({ employee }: { employee: employee }) {
  return (
    <>
      <div className="mt-6 flex justify-end gap-4 mb-4">
        <Link
          href="/employees"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-base font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <ArrowLeftIcon className=" mr-4 h-6 w-6" aria-hidden="true" />
          Go back
        </Link>
        <Link
          href={`/employees/${employee.id}/edit`}
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-lg font-medium text-gray-50 transition-colors hover:bg-gray-500"
        >
          Edit
          <PencilIcon className="ml-4 h-6 w-6" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-y-1 sm:gap-y-4 gap-x-8 grid-cols-1 sm:grid-cols-[max-content_1fr] justify-start items-start rounded-lg bg-gray-100 p-4 md:p-6 w-full min-w-72">
        {/* Employee name, designation, and status */}
        <div className="mb-8 col-span-1 sm:col-span-2 flex items-center justify-between flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold my-2">
              {employee.name}
            </h1>
            <Link
              className="text-gray-600 underline hover:text-purple-800 ml-4 sm:ml-0"
              href={`/companies/${employee.company.id}`}
            >
              <h2 className="text-xl font-bold">{employee.designation}</h2>
            </Link>
          </div>
          <span
            className={`m-2 px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[employee.status].style
            }`}
          >
            {statusStyles[employee.status].display}
          </span>
        </div>

        {/* Company */}
        <span className="text-sm font-medium mt-3 sm:mt-0">Company: </span>
        <Link
          className="text-gray-600 underline hover:text-purple-800 font-bold ml-4 sm:ml-0"
          href={`/companies/${employee.company.id}`}
        >
          {employee.company.name}
        </Link>

        {/* Department */}
        <span className="text-sm font-medium mt-3 sm:mt-0">Department: </span>
        <Link
          className="text-gray-600 underline hover:text-purple-800 font-bold ml-4 sm:ml-0"
          href={`/departments/${employee.department.id}`}
        >
          {employee.department.name}
        </Link>

        {/* Email */}
        <p className="text-sm font-medium mt-3 sm:mt-0">Email: </p>
        <strong className="ml-4 sm:ml-0">{employee.email}</strong>

        {/* Phone */}
        <p className="mt-2 text-sm font-medium mt-3 sm:mt-0">Phone: </p>
        <strong className="ml-4 sm:ml-0">{employee.mobile_number}</strong>

        {/* Address */}
        <p className="text-sm font-medium mt-3 sm:mt-0">Address: </p>
        <strong className="ml-4 sm:ml-0">{employee.address}</strong>

        {/* Joined At */}
        <p className="text-sm font-medium mt-3 sm:mt-0">Joined at: </p>
        <p>
          <strong className="ml-4 sm:ml-0">{employee.created_at}</strong>
        </p>

        {/* Updated At */}
        <p className="text-sm font-medium mt-3 sm:mt-0">Last updated: </p>
        <strong className="ml-4 sm:ml-0">{employee.updated_at}</strong>

        {/* Days employed */}
        <p className="text-sm font-medium mt-3 sm:mt-0">Days employed: </p>
        <strong className="ml-4 sm:ml-0">{employee.days_employed}</strong>

        {/* Hired at */}
        <p className="text-sm font-medium mt-3 sm:mt-0">Hired at: </p>
        <strong className="ml-4 sm:ml-0">{employee.hired_on}</strong>
      </div>
    </>
  );
}
