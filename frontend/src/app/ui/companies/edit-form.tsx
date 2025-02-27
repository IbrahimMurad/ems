"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/app/ui/buttons";
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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/companies/${company.id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton type="submit">Update Company</SubmitButton>
      </div>
    </form>
  );
}
