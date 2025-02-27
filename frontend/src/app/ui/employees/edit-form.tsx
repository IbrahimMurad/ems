"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/app/ui/buttons";
import { employee, department, company } from "@/app/lib/definitions";
import { updateEmployee, State } from "@/app/lib/actions/employee";
import { useState } from "react";

export default function EditEmployeeForm({
  employee,
  companies,
  departments,
}: {
  employee: employee;
  companies: company[];
  departments: department[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateEmployeeWithId = updateEmployee.bind(null, employee.id);
  const [state, formAction] = useActionState(
    updateEmployeeWithId,
    initialState
  );
  const [selectedCompany, setSelectedCompany] = useState<string>(
    employee.company.id
  );
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
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              value={selectedCompany}
              aria-describedby="company-error"
              onChange={(e) => setSelectedCompany(e.target.value)}
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
          <div id="company-error" aria-live="polite" aria-atomic="true">
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
        {/* Department*/}
        <div className="mb-4">
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-medium"
          >
            Department:
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="department"
              name="department"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={employee.department.id}
              aria-describedby="department-error"
            >
              <option key="---" value="">
                ---
              </option>
              {departments
                .filter(
                  (department) => department.company.id === selectedCompany
                )
                .map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </select>
          </div>
          <div id="department-error" aria-live="polite" aria-atomic="true">
            {state.errors?.department && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.department[0]}
              >
                {state.errors?.department[0]}
              </p>
            )}
          </div>
        </div>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={employee.name}
              aria-describedby="name-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
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
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={employee.email}
              aria-describedby="email-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.email[0]}
              >
                {state.errors?.email[0]}
              </p>
            )}
          </div>
        </div>
        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="mobile-number"
            className="mb-2 block text-sm font-medium"
          >
            Mobile Number:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="mobile-number"
              name="mobile_number"
              type="tel"
              defaultValue={employee.mobile_number}
              autoComplete="tel"
              aria-describedby="mobile-number-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="mobile-number-error" aria-live="polite" aria-atomic="true">
            {state.errors?.mobile_number && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.mobile_number[0]}
              >
                {state.errors?.mobile_number[0]}
              </p>
            )}
          </div>
        </div>
        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="address"
              name="address"
              type="text"
              defaultValue={employee.address}
              aria-describedby="address-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="address-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.address[0]}
              >
                {state.errors?.address[0]}
              </p>
            )}
          </div>
        </div>
        {/* Designation */}
        <div className="mb-4">
          <label
            htmlFor="designation"
            className="mb-2 block text-sm font-medium"
          >
            Designation:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="designation"
              name="designation"
              type="text"
              defaultValue={employee.designation}
              aria-describedby="designation-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="designation-error" aria-live="polite" aria-atomic="true">
            {state.errors?.designation && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.designation[0]}
              >
                {state.errors?.designation[0]}
              </p>
            )}
          </div>
        </div>
        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status:
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="status"
              name="status"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={employee.status}
              aria-describedby="status-error"
            >
              <option key="application_received" value="application_received">
                Application Received
              </option>
              <option key="interview_scheduled" value="interview_scheduled">
                Interview Scheduled
              </option>
              <option key="hired" value="hired">
                Hired
              </option>
              <option key="not_accepted" value="not_accepted">
                Not Accepted
              </option>
            </select>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.status[0]}
              >
                {state.errors?.status[0]}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        {state.errors?.non_field_errors &&
          state.errors?.non_field_errors.map((error) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/employees/${employee.id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton type="submit">Edit Employee</SubmitButton>
      </div>
    </form>
  );
}
