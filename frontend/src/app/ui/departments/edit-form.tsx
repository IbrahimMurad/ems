"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/app/ui/buttons";
import { department, company } from "@/app/lib/definitions";
import { updateDepartment, State } from "@/app/lib/actions/department";

export default function EditDepartmentForm({
  department,
  companies,
}: {
  department: department;
  companies: company[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateDepartmentWithId = updateDepartment.bind(null, department.id);
  const [state, formAction] = useActionState(
    updateDepartmentWithId,
    initialState
  );

  return (
    <form action={formAction}>
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
                aria-describedby="name-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && (
              <p className="mt-2 text-sm text-red-500">
                {state.errors.name[0]}
              </p>
            )}
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
              aria-describedby="company-error"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.company && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.company[0]}
              >
                {state.errors?.company[0]}
              </p>
            )}
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.non_field_errors && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.non_field_errors[0]}
              >
                {state.errors?.non_field_errors[0]}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/departments/${department.id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton type="submit">Update Department</SubmitButton>
      </div>
    </form>
  );
}
