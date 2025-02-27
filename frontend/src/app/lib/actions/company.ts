"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "@/app/lib/definitions";
import handleUnsuccessful from "../handleUnsuccessful";
import { CreateCompany, UpdateCompany } from "@/app/lib/schemas";
import { getTokens } from "@/app/lib/auth";

/**
 * State type definition
 * @typedef {Object} State
 * @property {Object} errors - Object containing error messages
 * @property {Object} errors.name - Error message for name field
 * @property {Object} errors.non_field_errors - Error message for non field errors
 * @property {string} message - Message to be displayed
 */
export type State = {
  errors?: {
    name?: string[];
    non_field_errors?: string[];
  };
  message?: string | null;
};

/**
 * Create a new company
 * @param {State} prevState - Previous state of the company
 * @param {FormData} formData - Form data containing company details
 * @returns {Promise<State>} - New state of the company
 */

export async function createCompany(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateCompany.safeParse({
    name: formData.get("name"),
  });

  // Handle invalide data in frontend
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Company.",
    };
  }

  // Get the access token
  const { accessToken } = await getTokens();
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  // Send a POST request to the backend to create a new company
  const response = await fetch(urls.companies, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to create company",
    };
  }

  // If anything goes wrong, throw an error to be handled by error.tsx file
  if (!response.ok) handleUnsuccessful(response);

  // if the company is created successfully, revalidate the companies page
  revalidatePath("/companies");
  redirect("/companies");
}

/**
 * Update a company
 * @param {State} prevState - Previous state of the company
 * @param {string} id - Company ID
 * @param {FormData} formData - Form data containing company details
 * @returns {Promise<State>} - New state of the company
 */

export async function updateCompany(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  // parse the form data to validate the fields by zod schema
  const validatedFields = UpdateCompany.safeParse({
    name: formData.get("name"),
  });

  // Handle invalide data in frontend
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Company.",
    };
  }

  // Get the access token
  const { accessToken } = await getTokens();
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  // Send a PATCH request to the backend to update the company
  const response = await fetch(`${urls.companies}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to update company",
    };
  }

  // If anything goes wrong, throw an error to be handled by error.tsx file
  if (!response.ok) handleUnsuccessful(response);

  // if the company is updated successfully, revalidate the company edit page
  revalidatePath(`/companies/${id}`);
  redirect(`/companies/${id}`);
}
