"use client";

import Link from "next/link";
import { department, authenticatedUser } from "@/app/lib/definitions";
import { DeleteButton, GoBackButton, EditButton } from "@/app/ui/buttons";
import { deleteDepartment } from "@/app/lib/actions/department";

export default function DepartmentDetails({
  department,
  user,
}: {
  department: department;
  user: authenticatedUser;
}) {
  const deleteDepartmentWithId = deleteDepartment.bind(null, department.id);

  return (
    <>
      <div className="mt-6 flex justify-end gap-4 mb-4">
        <GoBackButton href="/departments" />
        {user.role !== "employee" && (
          <EditButton href={`/companies/${department.id}/edit`} />
        )}
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
      {user.role !== "employee" && (
        <form
          action={deleteDepartmentWithId}
          className="mt-6 flex justify-end gap-4 mb-4"
        >
          <DeleteButton />
        </form>
      )}
    </>
  );
}
