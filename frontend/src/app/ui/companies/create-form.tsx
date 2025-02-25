import Link from "next/link";
import { Button } from "@/app/ui/button";
import { createCompany } from "@/app/lib/actions";

export default function Form() {
  return (
    <form action={createCompany}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Comapny name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Comapny name:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Company name"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/companies"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Company</Button>
      </div>
    </form>
  );
}
