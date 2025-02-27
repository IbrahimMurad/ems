"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "@/app/lib/definitions";
import { request } from "@/app/lib/auth";
import { CreateCompany, UpdateCompany } from "@/app/lib/schemas";

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

  const url = urls.companies;
  const method = "POST";
  const data = validatedFields.data;
  const response = await request(url, method, data);

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to create company",
    };
  }

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

  const url = `${urls.companies}${id}/`;
  const method = "PATCH";
  const data = validatedFields.data;
  const response = await request(url, method, data);

  // Handle invalide data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to update company",
    };
  }

  // if the company is updated successfully, revalidate the company edit page
  revalidatePath(`/companies/${id}`);
  redirect(`/companies/${id}`);
}
