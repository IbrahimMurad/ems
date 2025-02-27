import React from "react";
import { employee } from "@/app/lib/definitions";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { statusStyles } from "@/app/lib/definitions";

export default function EmployeesTable({
  employees,
}: {
  employees: employee[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 lg:pt-0">
          <div className="lg:hidden">
            {employees?.map((employee) => (
              <div
                key={employee.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-start flex-wrap justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center text-lg font-bold text-purple-800">
                      <Link
                        href={`/employees/${employee.id}`}
                        className="hover:underline"
                      >
                        {employee.name}
                      </Link>
                    </div>
                    <p className="text-md text-gray-500 font-medium">
                      {employee.designation}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[employee.status].style
                    }`}
                  >
                    {statusStyles[employee.status].display}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <Link
                      href={`/departments/${employee.department.id}`}
                      className="block ml-2 hover:underline"
                    >
                      {employee.department.name}
                    </Link>
                    <Link
                      href={`/companies/${employee.company.id}`}
                      className="block ml-2 text-sm hover:underline"
                    >
                      {employee.company.name}
                    </Link>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/employees/${employee.id}/edit`}
                      className="text-gray-800 hover:text-indigo-800  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${employee.name}`}</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden lg:table min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-md">
              <tr className="w-full font-bold">
                <th scope="col" className="px-3 py-5">
                  Name
                </th>
                <th scope="col" className="px-3 py-5">
                  Designation
                </th>
                <th scope="col" className="px-3 py-5">
                  Department
                </th>
                <th scope="col" className="px-3 py-5">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-2 pr-2">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white rounded-lg divide-y-2 divide-gray-100">
              {employees.map((employee) => (
                <tr key={employee.id} className="w-full">
                  <td className="p-3 text-base">
                    <Link
                      href={`/employees/${employee.id}`}
                      className="hover:underline"
                    >
                      {employee.name}
                    </Link>
                  </td>
                  <td className="p-3 text-base">{employee.designation}</td>
                  <td className="p-3">
                    <Link
                      href={`/departments/${employee.department.id}`}
                      className="block ml-2 hover:underline"
                    >
                      {employee.department.name}
                    </Link>
                    <Link
                      href={`/companies/${employee.company.id}`}
                      className="block ml-2 text-sm hover:underline"
                    >
                      {employee.company.name}
                    </Link>
                  </td>
                  <td className="truncate p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyles[employee.status].style
                      }`}
                    >
                      {statusStyles[employee.status].display}
                    </span>
                  </td>
                  <td className="p-3 text-right text-sm font-medium flex justify-end gap-2">
                    <Link
                      href={`/employees/${employee.id}/edit`}
                      className="text-gray-800 hover:text-blue-700  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${employee.name}`}</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
