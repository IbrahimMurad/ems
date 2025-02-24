import {
  usersList,
  companiesList,
  departmentsList,
  employeesList,
  employee,
  user,
} from "./definitions";
import { isoToLocaleDate } from "./utils";

const urls = {
  companies: "http://127.0.0.1:8000/api/companies/",
  departments: "http://127.0.0.1:8000/api/departments/",
  employees: "http://127.0.0.1:8000/api/employees/",
  users: "http://127.0.0.1:8000/api/users/",
};

export async function fetchUsers(): Promise<usersList> {
  try {
    const response = await fetch(urls.users);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const users = await response.json();
    users.results = users.results.map((user: user) => ({
      ...user,
      date_joined: isoToLocaleDate(user.date_joined),
      last_login: user.last_login ? isoToLocaleDate(user.last_login) : "-",
    }));
    return users;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchCompanies(): Promise<companiesList> {
  try {
    const response = await fetch(urls.companies);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const companies = await response.json();
    return companies;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

export async function fetchDepartments(): Promise<departmentsList> {
  try {
    const response = await fetch(urls.departments);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const departments = await response.json();
    return departments;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch departments.");
  }
}

export async function fetchEmployees(): Promise<employeesList> {
  try {
    const response = await fetch(urls.employees);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const employees = await response.json();
    employees.results = employees.results.map((employee: employee) => ({
      ...employee,
      hired_on: employee.hired_on
        ? isoToLocaleDate(employee.hired_on)
        : "(Not hired yet)",
    }));
    return employees;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}
