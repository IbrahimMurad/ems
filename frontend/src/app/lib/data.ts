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
import handleUnsuccessful from "./handleUnsuccessful";
import { getTokens } from "./auth";

export async function fetchUsers(
  page?: number,
  search?: string
): Promise<usersList | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(
      urls.users +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : ""),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const users = await response.json();
    users.results = users.results.map((user: user) => ({
      ...user,
      date_joined: isoToLocaleDate(user.date_joined),
      last_login: user.last_login ? isoToLocaleDate(user.last_login) : "-",
    }));
    return users;
  } catch (error) {
    throw error;
  }
}

export async function retrieveUser(id: string): Promise<user | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(`${urls.users}${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const user = await response.json();
    user.date_joined = isoToLocaleDate(user.date_joined);
    user.last_login = user.last_login ? isoToLocaleDate(user.last_login) : "-";
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user", { cause: error });
  }
}

export async function fetchCompanies(
  page?: number,
  search?: string
): Promise<companiesList | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(
      urls.companies +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : ""),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const companies = await response.json();
    return companies;
  } catch (error) {
    throw new Error("Failed to fetch companies", { cause: error });
  }
}

export async function retrieveCompany(id: string): Promise<company | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(`${urls.companies}${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const company = await response.json();
    company.created_at = isoToLocaleDate(company.created_at);
    company.updated_at = isoToLocaleDate(company.updated_at);
    return company;
  } catch (error) {
    throw new Error("Failed to fetch company", { cause: error });
  }
}

export async function fetchDepartments(
  page?: number,
  search?: string
): Promise<departmentsList | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(
      urls.departments +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : ""),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const department = await response.json();
    return department;
  } catch (error) {
    throw new Error(`Failed to fetch departments. ${error}`, { cause: error });
  }
}

export async function retrieveDepartment(
  id: string
): Promise<department | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(`${urls.departments}${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const department = await response.json();
    department.created_at = isoToLocaleDate(department.created_at);
    department.updated_at = isoToLocaleDate(department.updated_at);
    return department;
  } catch (error) {
    throw new Error(`Failed to fetch department. ${error}`, { cause: error });
  }
}

export async function fetchEmployees(
  page?: number,
  search?: string
): Promise<employeesList | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(
      urls.employees +
        (page ? `?page=${page}` : "") +
        (search ? `&search=${search}` : ""),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const employees = await response.json();
    employees.results = employees.results.map((employee: employee) => ({
      ...employee,
      hired_on: employee.hired_on
        ? isoToLocaleDate(employee.hired_on)
        : "(Not hired yet)",
    }));
    return employees;
  } catch (error) {
    throw new Error(`Failed to fetch employees. ${error}`, { cause: error });
  }
}

export async function retrieveEmployee(id: string): Promise<employee | null> {
  try {
    const { accessToken } = await getTokens();
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    const response = await fetch(`${urls.employees}${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) handleUnsuccessful(response);
    const employee = await response.json();
    employee.created_at = isoToLocaleDate(employee.created_at);
    employee.updated_at = isoToLocaleDate(employee.updated_at);
    employee.hired_on = employee.hired_on
      ? isoToLocaleDate(employee.hired_on)
      : "(Not hired yet)";
    return employee;
  } catch (error) {
    throw new Error(`Failed to fetch employee. ${error}`, { cause: error });
  }
}
