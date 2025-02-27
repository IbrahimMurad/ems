import * as React from "react";
import { notFound } from "next/navigation";
import {
  fetchUsers,
  fetchCompanies,
  fetchDepartments,
  fetchEmployees,
} from "../lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function HomePage() {
  const users = await fetchUsers();
  const companies = await fetchCompanies();
  const departments = await fetchDepartments();
  const employees = await fetchEmployees();

  if (!users || !companies || !departments || !employees) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={[{ label: "Dashboard", href: "/" }]} />
      <div className="flex justify-center md:justify-start flex-wrap gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64 flex flex-col justify-between">
          <h2 className="text-xl font-bold">Hired</h2>
          <p className="text-4xl pt-4 text-center font-bold">
            {
              employees.results.filter(
                (employee) => employee.status === "hired"
              ).length
            }
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64 flex flex-col justify-between">
          <h2 className="text-xl font-bold">Interview Scheduled</h2>
          <p className="text-4xl pt-4 text-center font-bold">
            {
              employees.results.filter(
                (employee) => employee.status === "interview_scheduled"
              ).length
            }
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64 flex flex-col justify-between">
          <h2 className="text-xl font-bold">Application Received</h2>
          <p className="text-4xl pt-4 text-center font-bold">
            {
              employees.results.filter(
                (employee) => employee.status === "application_received"
              ).length
            }
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64 flex flex-col justify-between">
          <h2 className="text-xl font-bold">Total Employees</h2>
          <p className="text-4xl  pt-4 text-center font-bold">
            {employees.count}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64 flex flex-col justify-between">
          <h2 className="text-xl font-bold">Companies</h2>
          <p className="text-4xl  pt-4 text-center font-bold">
            {companies.count}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64 flex flex-col justify-between">
          <h2 className="text-xl font-bold">Departments</h2>
          <p className="text-4xl  pt-4 text-center font-bold">
            {departments.count}
          </p>
        </div>
      </div>
    </main>
  );
}
