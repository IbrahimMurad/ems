import * as React from "react";
import {
  fetchUsers,
  fetchCompanies,
  fetchDepartments,
  fetchEmployees,
} from "../lib/data";

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
            <p className="text-sm mt-2">Total: {users.count}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Companies</h2>
            <p className="text-sm mt-2">Total: {companies.count}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Departments</h2>
            <p className="text-sm mt-2">Total: {departments.count}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Employees</h2>
            <p className="text-sm mt-2">Total: {employees.count}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-2 rounded-2xl shadow-lg w-full mt-4">
        <div className="w-full border-b p-4">
          <h1 className="font-bold text-2xl">Users</h1>
          <ul>
            {users.results.map((user) => (
              <li
                key={user.id}
                className="p-2 flex justify-start items-center gap-4"
              >
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.first_name}</span>
                <span>{user.last_name}</span>
                <span>{user.is_active ? "active" : "suspended"}</span>
                <span>{user.date_joined}</span>
                <span>{user.last_login}</span>
                <span>{user.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full border-b p-4">
          <h1 className="font-bold text-2xl">Companies</h1>
          <ul>
            {companies.results.map((company) => (
              <li
                key={company.id}
                className="p-2 flex justify-start items-center gap-4"
              >
                <span>{company.name}</span>
                <span>{company.number_of_departments}</span>
                <span>{company.number_of_employees}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full border-b p-4">
          <h1 className="font-bold text-2xl">Departments</h1>
          <ul>
            {departments.results.map((department) => (
              <li
                key={department.id}
                className="p-2 flex justify-start items-center gap-4"
              >
                <span>{department.name}</span>
                <span>{department.number_of_employees}</span>
                <span>{department.company.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full border-b p-4">
          <h1 className="font-bold text-2xl">Employees</h1>
          <ul>
            {employees.results.map((employee) => (
              <li
                key={employee.id}
                className="p-2 flex justify-start items-center gap-4"
              >
                <span>{employee.name}</span>
                <span>{employee.email}</span>
                <span>{employee.mobile_number}</span>
                <span>{employee.address}</span>
                <span>{employee.designation}</span>
                <span>{employee.hired_on}</span>
                <span>{employee.days_employed}</span>
                <span>{employee.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
