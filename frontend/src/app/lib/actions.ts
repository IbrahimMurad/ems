"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "./definitions";

export async function createCompany(formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
  };
  const response = await fetch(urls.companies, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    throw new Error("Failed to create company");
  }
  revalidatePath("/companies");
  redirect("/companies");
}

export async function createDepartment(formData: FormData) {
  const rawFormData = {
    company: formData.get("company"),
    name: formData.get("name"),
  };
  const response = await fetch(urls.departments, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    throw new Error("Failed to create department");
  }
  revalidatePath("/departments");
  redirect("/departments");
}

export async function createEmployee(formData: FormData) {
  const rawFormData = {
    company: formData.get("company"),
    department: formData.get("department"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone_number: formData.get("phone_number"),
    status: formData.get("status"),
    address: formData.get("address"),
    designation: formData.get("designation"),
  };
  const response = await fetch(urls.employees, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    throw new Error("Failed to create employee");
  }
  revalidatePath("/employees");
  redirect("/employees");
}

export async function createUser(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const response = await fetch(urls.users, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  revalidatePath("/users");
  redirect("/users");
}

export async function deleteCompany(id: string) {
  const response = await fetch(`${urls.companies}/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete company");
  }
  revalidatePath("/companies");
  redirect("/companies");
}

export async function deleteDepartment(id: string) {
  const response = await fetch(`${urls.departments}/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete department");
  }
  revalidatePath("/departments");
  redirect("/departments");
}

export async function deleteEmployee(id: string) {
  const response = await fetch(`${urls.employees}/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
  revalidatePath("/employees");
  redirect("/employees");
}

export async function deleteUser(id: string) {
  const response = await fetch(`${urls.users}/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  revalidatePath("/users");
  redirect("/users");
}
