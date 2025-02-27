"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "../definitions";
import { CreateUser, UpdateUser } from "../schemas";
import { request } from "@/app/lib/auth";

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

  const url = urls.users;
  const method = "POST";
  const data = validatedFields.data;
  const response = await request(url, method, data);

  // Handle invalid data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to create user",
    };
  }

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
  const url = `${urls.users}${id}/`;
  const method = "PATCH";
  const data = validatedFields.data;
  const response = await request(url, method, data);

  // Handle invalid data rejected by the backend
  if (response.status === 400) {
    const error = await response.json();
    return {
      errors: error,
      message: "Failed to update user",
    };
  }

  // If updated successfully reload the user's page
  revalidatePath(`/users/${id}/edit`);
  redirect(`/users/${id}/edit`);
}
