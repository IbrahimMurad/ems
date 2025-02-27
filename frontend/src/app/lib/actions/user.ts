"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "../definitions";
import { CreateUser, UpdateUser } from "../schemas";
import handleUnsuccessful from "../handleUnsuccessful";
import { getTokens } from "@/app/lib/auth";

/**
 * State type definition
 * @typedef {Object} State
 * @property {Object} errors - Object containing error messages
 * @property {Object} errors.username - Error message for name field
 * @property {Object} errors.email - Error message for email field
 * @property {Object} errors.role - Error message for role field
 * @property {Object} errors.password - Error message for password field
 * @property {Object} errors.confirmPassword - Error message for confirmPassword field
 * @property {Object} errors.non_field_errors - Error message for non field errors
 * @property {string} message - Message to be displayed
 */

export type State = {
  errors?: {
    username?: string[];
    email?: string[];
    role?: string[];
    password?: string[];
    confirm_password?: string[];
    non_field_errors?: string[];
  };
  message?: string | null;
};

/**
 * Create a new user
 * @param {State} prevState - Previous state of the user
 * @param {FormData} formData - Form data containing user details
 * @returns {Promise<State>} - New state of the user
 */

export async function createUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Validate the form data
  const validatedFields = CreateUser.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    role: formData.get("role"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  // Handle invalid data in frontend
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Department.",
    };
  }

  // Get the access token
  const { accessToken } = await getTokens();
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  // Send a POST request to the backend to create a new user
  const response = await fetch(urls.users, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalid data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to create user",
    };
  }

  // Handle unsuccessful response
  if (!response.ok) handleUnsuccessful(response);

  // If created successfully go to the users page
  revalidatePath("/users");
  redirect("/users");
}

/**
 * Update a user
 * @param {number} id - User ID
 * @param {State} prevState - Previous state of the user
 * @param {FormData} formData - Form data containing user details
 * @returns {Promise<State>} - New state of the user
 */

export async function updateUser(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  // Validate the form data
  const validatedFields = UpdateUser.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    role: formData.get("role"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  // Handle invalid data in frontend
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Department.",
    };
  }

  // Get the access token
  const { accessToken } = await getTokens();
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  // Send a PATCH request to the backend to update a user
  const response = await fetch(`${urls.users}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(validatedFields.data),
  });

  // Handle invalid data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to update user",
    };
  }

  // Handle unsuccessful response
  if (!response.ok) handleUnsuccessful(response);

  // If updated successfully reload the user's page
  revalidatePath(`/users/${id}/edit`);
  redirect(`/users/${id}/edit`);
}
