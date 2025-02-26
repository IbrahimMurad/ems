"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateUser, State } from "@/app/lib/actions/user";
import { user } from "@/app/lib/definitions";

export default function EditUserForm({ user }: { user: user }) {
  const initialState: State = { errors: {}, message: null };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, formAction] = useActionState(updateUserWithId, initialState);
  return (
    <form action={formAction} noValidate>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* username */}
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Username:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user.username}
              aria-describedby="username-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="username-error" aria-live="polite" aria-atomic="true">
            {state.errors?.username && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.username[0]}
              >
                {state.errors?.username[0]}
              </p>
            )}
          </div>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              aria-describedby="email-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.email[0]}
              >
                {state.errors?.email[0]}
              </p>
            )}
          </div>
        </div>
        {/* Role */}
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            Role:
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="role"
              name="role"
              defaultValue={user.role}
              aria-describedby="role-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div id="role-error" aria-live="polite" aria-atomic="true">
            {state.errors?.role && (
              <p
                className="mt-2 text-sm text-red-500"
                key={state.errors?.role[0]}
              >
                {state.errors?.role[0]}
              </p>
            )}
          </div>
        </div>
        {/* <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium"
          >
            Confirm Password:
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="confirm-password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update User</Button>
      </div>
    </form>
  );
}
