import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { department } from "@/app/lib/definitions";

export default async function DepartmentsTable({
  departments,
}: {
  departments: department[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
          <div className="md:hidden">
            {departments?.map((department) => (
              <div
                key={department.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center text-lg font-bold text-purple-800">
                      <Link
                        className="hover:text-purple-600 hover:underline"
                        href={`/departments/${department.id}`}
                      >
                        {department.name}
                      </Link>
                    </div>
                    <Link
                      href={`/companies/${department.company.id}`}
                      className="text-md text-gray-500 font-medium hover:text-purple-500 hover:underline"
                    >
                      {department.company.name}
                    </Link>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-lg font-medium">
                      Employees:{" "}
                      <span className="ml-4">
                        {department.number_of_employees}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/departments/${department.id}/edit`}
                      className="text-gray-800 hover:text-indigo-800  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${department.name}`}</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden md:table min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-md">
              <tr className="w-full font-bold">
                <th scope="col" className="px-3 py-5">
                  Name
                </th>
                <th scope="col" className="px-3 py-5">
                  Company
                </th>
                <th scope="col" className="px-3 py-5">
                  Employees
                </th>
                <th scope="col" className="relative py-3 pl-2 pr-2">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white rounded-lg divide-y-2 divide-gray-100">
              {departments.map((department) => (
                <tr key={department.id} className="w-full">
                  <td className="px-3 py-3">
                    <Link
                      className="hover:text-purple-600 hover:underline"
                      href={`/departments/${department.id}`}
                    >
                      {department.name}
                    </Link>
                  </td>
                  <td className="truncate px-3 py-3">
                    <Link
                      href={`/companies/${department.company.id}`}
                      className="hover:text-purple-500 hover:underline"
                    >
                      {department.company.name}
                    </Link>
                  </td>
                  <td className="truncate px-3 py-3">
                    {department.number_of_employees}
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-medium flex justify-end gap-2">
                    <Link
                      href={`/departments/${department.id}/edit`}
                      className="text-gray-800 hover:text-indigo-800  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${department.name}`}</span>
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
