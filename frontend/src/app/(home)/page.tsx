import * as React from "react";
import {
  fetchUsers,
  fetchCompanies,
  fetchDepartments,
  fetchEmployees,
} from "../lib/data";
import {
  companiesList,
  departmentsList,
  employeesList,
  usersList,
} from "../lib/definitions";

export default async function HomePage() {
  const users = await fetchUsers();
  const companies = await fetchCompanies();
  const departments = await fetchDepartments();
  const employees = await fetchEmployees();
  return (
    <div className="grid place-items-center bg-white p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg min-w-72">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Users</h2>
            <p className="text-sm mt-2">Total: {(users as usersList).count}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Companies</h2>
            <p className="text-sm mt-2">
              Total: {(companies as companiesList).count}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Departments</h2>
            <p className="text-sm mt-2">
              Total: {(departments as departmentsList).count}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Employees</h2>
            <p className="text-sm mt-2">
              Total: {(employees as employeesList).count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
