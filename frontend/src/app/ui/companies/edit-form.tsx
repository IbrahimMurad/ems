"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { company } from "@/app/lib/definitions";
import { updateCompany, State } from "@/app/lib/actions/company";

export default function EditCompanyForm({ company }: { company: company }) {
  const initialState: State = { message: null, errors: {} };
  const updateCompanyWithId = updateCompany.bind(null, company.id);
  const [state, formAction] = useActionState(updateCompanyWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Company Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Company Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={company.name}
                aria-describedby="name-error"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.name[0]}
              >
                {state.errors?.name[0]}
              </p>
            )}
          </div>
        </div>
        {/* Joined At */}
        <div className="mb-4">
          <label
            htmlFor="created-at"
            className="mb-2 block text-sm font-medium"
          >
            Joined at
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="created-at"
                name="created_at"
                type="string"
                defaultValue={company.created_at}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Updated At */}
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
                type="string"
                defaultValue={company.updated_at}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Number of Departments */}
        <div className="mb-4">
          <label
            htmlFor="number-of-departments"
            className="mb-2 block text-sm font-medium"
          >
            Number of Departments
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="number-of-departments"
                name="number_of_departments"
                type="number"
                defaultValue={company.number_of_departments}
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
                type="number"
                defaultValue={company.number_of_employees}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/comapnies"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Company</Button>
      </div>
    </form>
  );
}
