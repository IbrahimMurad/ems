"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "../definitions";
import { CreateEmployee, UpdateEmployee } from "../schemas";
import handleUnsuccessful from "../handleUnsuccessful";

/**
 * State type definition
 * @typedef {Object} State
 * @property {Object} errors - Object containing error messages
 * @property {Object} errors.company - Error message for company field
 * @property {Object} errors.department - Error message for department field
 * @property {Object} errors.name - Error message for name field
 * @property {Object} errors.email - Error message for email field
 * @property {Object} errors.mobile_number - Error message for mobile number field
 * @property {Object} errors.address - Error message for address field
 * @property {Object} errors.designation - Error message for designation field
 * @property {Object} errors.status - Error message for status field
 * @property {Object} errors.non_field_errors - Error message for non field errors (general)
 * @property {string} message - Message to be displayed
 */
export type State = {
  errors?: {
    company?: string[];
    department?: string[];
    name?: string[];
    email?: string[];
    mobile_number?: string[];
    address?: string[];
    designation?: string[];
    status?: string[];
    non_field_errors?: string[];
  };
  message?: string | null;
};

/**
 * Create a new employee
 * @param {State} prevState - Previous state of the employee
 * @param {FormData} formData - Form data containing employee details
 * @returns {Promise<State>} - New state of the employee
 */

export async function createEmployee(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateEmployee.safeParse({
    company: formData.get("company"),
    department: formData.get("department"),
    name: formData.get("name"),
    email: formData.get("email"),
    mobile_number: formData.get("mobile_number"),
    address: formData.get("address"),
    designation: formData.get("designation"),
    status: formData.get("status"),
  });

  // Handle invalide data in frontend
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Department.",
    };
  }

  // Send a POST request to the backend to create a new employee
  const response = await fetch(urls.employees, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to create department.",
    };
  }

  // If anything goes wrong, throw an error to be handled by error.tsx file
  if (!response.ok) handleUnsuccessful(response);

  // if the department is created successfully, revalidate the departments page
  revalidatePath("/employees");
  redirect("/employees");
}

/**
 * Update an employee
 * @param {string} id - ID of the employee to be updated
 * @param {State} prevState - Previous state of the employee
 * @param {FormData} formData - Form data containing employee details
 * @returns {Promise<State>} - New state of the employee
 */

export async function updateEmployee(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = UpdateEmployee.safeParse({
    company: formData.get("company"),
    department: formData.get("department"),
    name: formData.get("name"),
    email: formData.get("email"),
    mobile_number: formData.get("mobile_number"),
    address: formData.get("address"),
    designation: formData.get("designation"),
    status: formData.get("status"),
  });

  // Handle invalide data in frontend
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Department.",
    };
  }

  // Send a PATCH request to the backend to update an employee
  const response = await fetch(`${urls.employees}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to create department.",
    };
  }

  // If anything goes wrong, throw an error to be handled by error.tsx file
  if (!response.ok) handleUnsuccessful(response);

  // if the department is created successfully, revalidate the departments page
  revalidatePath(`/employees/${id}`);
  redirect(`/employees/${id}`);
}
