import { fetchEmployees } from "@/app/lib/data";
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

export default async function Page() {
  const employees = await fetchEmployees();
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
                  Email
                </th>
                <th scope="col" className="px-3 py-5">
                  Mobile
                </th>
                <th scope="col" className="px-3 py-5">
                  Company
                </th>
                <th scope="col" className="px-3 py-5">
                  Department
                </th>
                <th scope="col" className="px-3 py-5">
                  Address
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
              {employees.results.map((employee, index) => (
                <tr key={employee.id} className="w-full">
                  <td className="p-3">{index + 1}</td>
                  <td className="truncate p-3">{employee.name}</td>
                  <td className="truncate p-3">{employee.email}</td>
                  <td className="truncate p-3">{employee.mobile_number}</td>
                  <td className="truncate p-3">{employee.company.name}</td>
                  <td className="truncate p-3">{employee.department.name}</td>
                  <td className="truncate p-3">{employee.address}</td>
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
                      href="#"
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
