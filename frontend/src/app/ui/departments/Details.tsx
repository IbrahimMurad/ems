"use client";

import Link from "next/link";
import { PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { department } from "@/app/lib/definitions";

export default function DepartmentDetails({
  department,
}: {
  department: department;
}) {
  return (
    <>
      <div className="mt-6 flex justify-end gap-4 mb-4">
        <Link
          href="/departments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-base font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <ArrowLeftIcon className=" mr-4 h-6 w-6" aria-hidden="true" />
          Go back
        </Link>
        <Link
          href={`/departments/${department.id}/edit`}
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-lg font-medium text-gray-50 transition-colors hover:bg-gray-500"
        >
          Edit
          <PencilIcon className="ml-4 h-6 w-6" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-y-4 gap-x-8 grid-cols-[max-content_1fr] rounded-lg bg-gray-100 p-4 md:p-6">
        {/* Company Name */}
        <div className="mb-8 col-span-2">
          <h1 className="text-3xl font-bold my-2">{department.name}</h1>
          <Link
            className="text-gray-600 underline hover:text-purple-800"
            href={`/companies/${department.company.id}`}
          >
            <h2 className="text-xl font-bold">{department.company.name}</h2>
          </Link>
        </div>
        {/* Joined At */}
        <span className="mb-2 text-sm font-medium">Joined at : </span>
        <strong>{department.created_at}</strong>

        {/* Updated At */}
        <span className="mb-2 text-sm font-medium">Last updated : </span>
        <strong>{department.updated_at}</strong>

        {/* Number of Employees */}
        <span className="mb-2 text-sm font-medium">Total employees : </span>
        <strong>{department.number_of_employees}</strong>
      </div>
    </>
  );
}
