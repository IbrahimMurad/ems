"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "./definitions";
import { CreateEmployee, UpdateEmployee } from "./schemas";

export async function createEmployee(formData: FormData) {
  const rawFormData = CreateEmployee.parse({
    company: formData.get("company"),
    department: formData.get("department"),
    name: formData.get("name"),
    email: formData.get("email"),
    mobile_number: formData.get("mobile_number"),
    address: formData.get("address"),
    designation: formData.get("designation"),
    status: formData.get("status"),
  });
  const response = await fetch(urls.employees, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
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
    const error = await response.json();
    console.log(error);
    throw new Error("Failed to create user");
  }
  revalidatePath("/users");
  redirect("/users");
}

export async function updateEmployee(id: string, formData: FormData) {
  const rawFormData = UpdateEmployee.parse({
    company: formData.get("company"),
    department: formData.get("department"),
    name: formData.get("name"),
    email: formData.get("email"),
    mobile_number: formData.get("mobile_number"),
    address: formData.get("address"),
    designation: formData.get("designation"),
    status: formData.get("status"),
  });
  const response = await fetch(`${urls.employees}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error("Failed to update employee");
  }
  revalidatePath(`/employees/${id}/edit`);
  redirect(`/employees/${id}/edit`);
}

export async function updateUser(id: number, formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    username: formData.get("username"),
    role: formData.get("role"),
  };
  const response = await fetch(`${urls.users}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error("Failed to update user");
  }
  revalidatePath(`/users/${id}/edit`);
  redirect(`/users/${id}/edit`);
}
