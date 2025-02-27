import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteItem from "@/app/ui/DeleteItem";
import { user } from "@/app/lib/definitions";
import { capitalize } from "@/app/lib/utils";

export default async function UsersTable({ users }: { users: user[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 lg:pt-0">
          <div className="lg:hidden">
            {users?.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-start flex-wrap justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center text-lg font-bold text-purple-800">
                      <p>{user.username}</p>
                    </div>
                    <p className="text-md text-gray-500 font-medium">
                      {user.email}
                    </p>
                  </div>
                  <span>{capitalize(user.role)}</span>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="ml-2 text-sm">
                      Last login: {user.last_login}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/departments/${user.id}/edit`}
                      className="text-gray-800 hover:text-indigo-800  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${user.username}`}</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <DeleteItem url={user.url} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden lg:table min-w-full text-gray-900">
            <thead className="rounded-lg text-left">
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
                  Role
                </th>
                <th scope="col" className="px-3 py-5 hidden xl:table-cell">
                  Last Login
                </th>
                <th scope="col" className="relative py-3 pl-2 pr-2">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white rounded-lg divide-y-2 divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="w-full">
                  <td className="px-3 py-3">{user.id}</td>
                  <td className="px-3 py-3">{user.username}</td>
                  <td className="px-3 py-3">{user.email}</td>
                  <td className="px-3 py-3">{capitalize(user.role)}</td>
                  <td className="px-3 py-3 hidden xl:table-cell">
                    {user.last_login}
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-medium flex justify-end gap-2">
                    <Link
                      href={`/users/${user.id}/edit`}
                      className="text-gray-800 hover:text-indigo-800  hover:scale-110"
                    >
                      <span className="sr-only">{`Edit ${user.username}`}</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <DeleteItem url={user.url} />
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
