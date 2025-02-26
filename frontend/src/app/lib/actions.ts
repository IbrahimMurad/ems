"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "./definitions";
import { z } from "zod";

const EmployeeSchema = z.object({
  company: z.string().uuid(),
  department: z.string().uuid(),
  name: z.string().max(200).min(2),
  email: z.string().email(),
  mobile_number: z.string().regex(/^\+?1?\d{9,15}$/),
  status: z.enum([
    "application_received",
    "interview_scheduled",
    "hired",
    "not_accepted",
  ]),
  address: z.string().max(256),
  designation: z.string().max(256),
});

const CreateEmployee = EmployeeSchema.partial();

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
    const error = await response.json();
    console.log(error);
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
    const error = await response.json();
    console.log(error);
    throw new Error("Failed to create department");
  }
  revalidatePath("/departments");
  redirect("/departments");
}

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

export async function updateCompany(id: string, formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
  };
  const response = await fetch(`${urls.companies}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error("Failed to update company");
  }
  revalidatePath(`/companies/${id}/edit`);
  redirect(`/companies/${id}/edit`);
}

export async function updateDepartment(id: string, formData: FormData) {
  const rawFormData = {
    company: formData.get("company"),
    name: formData.get("name"),
  };
  const response = await fetch(`${urls.departments}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error("Failed to update department");
  }
  revalidatePath(`/departments/${id}/edit`);
  redirect(`/departments/${id}/edit`);
}

export async function updateEmployee(id: string, formData: FormData) {
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
