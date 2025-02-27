import React from "react";
import { employee } from "@/app/lib/definitions";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { statusDisplayAndStyles } from "@/app/lib/definitions";
import DeleteItem from "@/app/ui/DeleteItem";

const statusStyles: statusDisplayAndStyles = {
  application_received: {
    display: "Application Received",
    style: "bg-yellow-100 text-yellow-800",
  },
  interview_scheduled: {
    display: "Interview Scheduled",
    style: "bg-blue-100 text-blue-800",
  },
  hired: { display: "Hired", style: "bg-green-100 text-green-800" },
  not_accepted: { display: "Not Accepted", style: "bg-red-100 text-red-800" },
};

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
                      <p>{employee.name}</p>
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
                    <p className="ml-2">{employee.department.name}</p>
                    <p className="ml-2 text-sm">{employee.company.name}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/departments/${employee.id}/edit`}
                      className="text-gray-800 hover:text-indigo-800  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${employee.name}`}</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <DeleteItem url={employee.url} />
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
                  <td className="p-3 text-base">{employee.name}</td>
                  <td className="p-3 text-base">{employee.designation}</td>
                  <td className="p-3">
                    <p className="text-base">{employee.department.name}</p>
                    <p className="text-sm">{employee.company.name}</p>
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
                    <DeleteItem url={employee.url} />
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
