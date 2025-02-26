import {
  usersList,
  companiesList,
  departmentsList,
  employeesList,
  employee,
  user,
  company,
  department,
} from "./definitions";
import { isoToLocaleDate } from "./utils";
import { urls } from "./definitions";

export async function fetchUsers(
  page?: number,
  search?: string
): Promise<usersList> {
  try {
    const response = await fetch(
      urls.users +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : "")
    );
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

export async function retrieveUser(id: string): Promise<user> {
  try {
    const response = await fetch(`${urls.users}${id}/`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const user = await response.json();
    user.date_joined = isoToLocaleDate(user.date_joined);
    user.last_login = user.last_login ? isoToLocaleDate(user.last_login) : "-";
    return user;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchCompanies(
  page?: number,
  search?: string
): Promise<companiesList> {
  try {
    const response = await fetch(
      urls.companies +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : "")
    );
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

export async function retrieveCompany(id: string): Promise<company> {
  try {
    const response = await fetch(`${urls.companies}${id}/`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const company = await response.json();
    company.created_at = isoToLocaleDate(company.created_at);
    company.updated_at = isoToLocaleDate(company.updated_at);
    return company;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch company.");
  }
}

export async function fetchDepartments(
  page?: number,
  search?: string
): Promise<departmentsList> {
  try {
    const response = await fetch(
      urls.departments +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : "")
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const department = await response.json();
    return department;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch departments.");
  }
}

export async function retrieveDepartment(id: string): Promise<department> {
  try {
    const response = await fetch(`${urls.departments}${id}/`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const department = await response.json();
    department.created_at = isoToLocaleDate(department.created_at);
    department.updated_at = isoToLocaleDate(department.updated_at);
    return department;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch department.");
  }
}

export async function fetchEmployees(
  page?: number,
  search?: string
): Promise<employeesList> {
  try {
    const response = await fetch(
      urls.employees +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : "")
    );
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

export async function retrieveEmployee(id: string): Promise<employee> {
  try {
    const response = await fetch(`${urls.employees}${id}/`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const employee = await response.json();
    employee.created_at = isoToLocaleDate(employee.created_at);
    employee.updated_at = isoToLocaleDate(employee.updated_at);
    employee.hired_on = employee.hired_on
      ? isoToLocaleDate(employee.hired_on)
      : "(Not hired yet)";
    return employee;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch employee.");
  }
}
