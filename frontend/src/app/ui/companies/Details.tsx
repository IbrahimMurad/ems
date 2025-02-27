"use client";

import { authenticatedUser, company } from "@/app/lib/definitions";
import { GoBackButton, EditButton } from "@/app/ui/buttons";
import { DeleteButton } from "@/app/ui/buttons";
import { deleteCompany } from "@/app/lib/actions/company";

export default function CompanyDetails({
  company,
  user,
}: {
  company: company;
  user: authenticatedUser;
}) {
  const deleteCompanyWithId = deleteCompany.bind(null, company.id);

  return (
    <>
      <div className="mt-6 flex justify-end gap-4 mb-4">
        <GoBackButton href="/companies" />
        {user.role !== "employee" && (
          <EditButton href={`/companies/${company.id}/edit`} />
        )}
      </div>
      <div className="grid gap-y-4 gap-x-8 grid-cols-[max-content_1fr] rounded-lg bg-gray-100 p-4 md:p-6">
        {/* Company Name */}
        <div className="mb-8 col-span-2">
          <h1 className="text-3xl font-bold">{company.name}</h1>
        </div>
        {/* Joined At */}
        <span className="mb-2 text-sm font-medium">Joined at : </span>
        <strong>{company.created_at}</strong>

        {/* Updated At */}
        <span className="mb-2 text-sm font-medium">Last updated : </span>
        <strong>{company.updated_at}</strong>

        {/* Number of Departments */}
        <span className="mb-2 text-sm font-medium">Total departments : </span>
        <strong>{company.number_of_departments}</strong>

        {/* Number of Employees */}
        <span className="mb-2 text-sm font-medium">Total employees : </span>
        <strong>{company.number_of_employees}</strong>
      </div>
      {user.role !== "employee" && (
        <form
          action={deleteCompanyWithId}
          className="mt-6 flex justify-end gap-4 mb-4"
        >
          <DeleteButton />
        </form>
      )}
    </>
  );
}
