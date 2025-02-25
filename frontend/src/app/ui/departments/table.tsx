import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteItem from "@/app/ui/DeleteItem";
import { department } from "@/app/lib/definitions";

export default async function DepartmentsTable({
  departments,
}: {
  departments: department[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-md">
              <tr className="w-full font-bold">
                <th scope="col" className="px-3 py-5">
                  ID
                </th>
                <th scope="col" className="px-3 py-5">
                  Name
                </th>
                <th scope="col" className="px-3 py-5">
                  Company
                </th>
                <th scope="col" className="px-3 py-5">
                  Number of Employees
                </th>
                <th scope="col" className="relative py-3 pl-2 pr-2">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white rounded-lg divide-y-2 divide-gray-100">
              {departments.map((department, index) => (
                <tr key={department.id} className="w-full">
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="truncate px-3 py-3">{department.name}</td>
                  <td className="truncate px-3 py-3">
                    {department.company.name}
                  </td>
                  <td className="truncate px-3 py-3">
                    {department.number_of_employees}
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-medium flex justify-end gap-2">
                    <Link
                      href="#"
                      className="text-gray-800 hover:text-indigo-800  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${department.name}`}</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <DeleteItem url={department.url} />
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
