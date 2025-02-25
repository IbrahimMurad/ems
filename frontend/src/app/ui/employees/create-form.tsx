"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { company, department } from "@/app/lib/definitions";
import { createEmployee } from "@/app/lib/actions";
import { useState } from "react";

export default function Form({
  companies,
  departments,
}: {
  companies: company[];
  departments: department[];
}) {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  return (
    <form action={createEmployee}>
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
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
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
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={""}
              required
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
              placeholder="Employee's Name"
              required
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
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
              placeholder="Email Address"
              required
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
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
              placeholder="Mobile Number"
              autoComplete="tel"
              required
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
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
              placeholder="Address"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
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
              placeholder="Designation"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
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
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={"application_received"}
              required
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
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/employees"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Employee</Button>
      </div>
    </form>
  );
}
