"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "@/app/lib/definitions";
import handleUnsuccessful from "../handleUnsuccessful";

import { CreateDepartment, UpdateDepartment } from "@/app/lib/schemas";

/**
 * State type definition
 * @typedef {Object} State
 * @property {Object} errors - Object containing error messages
 * @property {Object} errors.company - Error message for company field
 * @property {Object} errors.name - Error message for name field
 * @property {Object} errors.non_field_errors - Error message for non field errors
 * @property {string} message - Message to be displayed
 */
export type State = {
  errors?: {
    company?: string[];
    name?: string[];
    non_field_errors?: string[];
  };
  message?: string | null;
};

/**
 * Create a new department
 * @param {State} prevState - Previous state of the department
 * @param {FormData} formData - Form data containing department details
 * @returns {Promise<State>} - New state of the department
 */

export async function createDepartment(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateDepartment.safeParse({
    company: formData.get("company"),
    name: formData.get("name"),
  });

  // Handle invalide data in frontend
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Department.",
    };
  }

  // Send a POST request to the backend to create a new department
  const response = await fetch(urls.departments, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    if (
      error.non_field_errors.includes(
        "The fields company, name must make a unique set."
      )
    ) {
      error.non_field_errors = ["Department already exists."];
    }
    return {
      errors: error,
      message: "Failed to create department.",
    };
  }

  // If anything goes wrong, throw an error to be handled by error.tsx file
  if (!response.ok) handleUnsuccessful(response);

  // if the department is created successfully, revalidate the departments page
  revalidatePath("/departments");
  redirect("/departments");
}

/**
 * Update a department
 * @param {State} prevState - Previous state of the department
 * @param {string} id - department ID
 * @param {FormData} formData - Form data containing department details
 * @returns {Promise<State>} - New state of the department
 */

export async function updateDepartment(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  // parse the form data to validate the fields by zod schema
  const validatedFields = UpdateDepartment.safeParse({
    company: formData.get("company"),
    name: formData.get("name"),
  });

  // Handle invalide data in frontend
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update department.",
    };
  }

  // Send a PATCH request to the backend to update the department
  const response = await fetch(`${urls.departments}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    if (
      error.non_field_errors.includes(
        "The fields company, name must make a unique set."
      )
    ) {
      error.non_field_errors = ["Department already exists."];
    }
    return {
      errors: error,
      message: "Failed to update department.",
    };
  }

  // If anything goes wrong, throw an error to be handled by error.tsx file
  if (!response.ok) handleUnsuccessful(response);

  // if the department is updated successfully, revalidate the department edit page
  revalidatePath(`/departments/${id}`);
  redirect(`/departments/${id}`);
}
