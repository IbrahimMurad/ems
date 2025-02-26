"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { company } from "@/app/lib/definitions";
import { createDepartment, State } from "@/app/lib/actions/department";

export default function Form({ companies }: { companies: company[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createDepartment, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Comapny*/}
        <div className="mb-4">
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company:
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="company"
              name="company"
              aria-describedby="company-error"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={""}
            >
              <option key="---" value="">
                ---
              </option>
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
        </div>
        {/* Department name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Department name:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Department name"
              aria-describedby="name-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && (
              <p className="mt-2 text-sm text-red-500">
                {state.errors.name[0]}
              </p>
            )}
          </div>
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.non_field_errors && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.non_field_errors[0]}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/departments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Department</Button>
      </div>
    </form>
  );
}
