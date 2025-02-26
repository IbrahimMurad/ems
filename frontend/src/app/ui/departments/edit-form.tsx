"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { department, company } from "@/app/lib/definitions";
import { updateDepartment } from "@/app/lib/actions";

export default function EditDepartmentForm({
  department,
  companies,
}: {
  department: department;
  companies: company[];
}) {
  const updateDepartmentWithId = updateDepartment.bind(null, department.id);

  return (
    <form action={updateDepartmentWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Department Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Department name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={department.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Department company */}
        <div className="mb-4">
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company
          </label>
          <div className="relative">
            <select
              id="comapny"
              name="company"
              defaultValue={department.company.id}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Added at */}
        <div className="mb-4">
          <label
            htmlFor="created-at"
            className="mb-2 block text-sm font-medium"
          >
            Added at
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="created-at"
                name="created_at"
                type="text"
                defaultValue={department.created_at}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Last updated */}
        <div className="mb-4">
          <label
            htmlFor="updated-at"
            className="mb-2 block text-sm font-medium"
          >
            Last updated
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="updated-at"
                name="updated_at"
                type="text"
                defaultValue={department.updated_at}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Number of Employees */}
        <div className="mb-4">
          <label
            htmlFor="number-of-employees"
            className="mb-2 block text-sm font-medium"
          >
            Number of Employees
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="number-of-employees"
                name="number_of_employees"
                type="text"
                defaultValue={department.number_of_employees}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/departments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Department</Button>
      </div>
    </form>
  );
}
