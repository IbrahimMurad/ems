import Link from "next/link";
import { Button } from "@/app/ui/button";
import { company } from "@/app/lib/definitions";
import { createDepartment } from "@/app/lib/actions";

export default function Form({ companies }: { companies: company[] }) {
  return (
    <form action={createDepartment}>
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
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
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
        <Button type="submit">Create Department</Button>
      </div>
    </form>
  );
}
