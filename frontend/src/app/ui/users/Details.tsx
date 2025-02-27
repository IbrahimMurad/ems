"use client";

import { GoBackButton, EditButton } from "@/app/ui/buttons";
import { user } from "@/app/lib/definitions";
import { capitalize } from "@/app/lib/utils";
import { deleteUser } from "@/app/lib/actions/user";
import { DeleteButton } from "@/app/ui/buttons";

export default function UserDetails({ user }: { user: user }) {
  const deleteUserWithId = deleteUser.bind(null, user.id);
  return (
    <>
      <div className="mt-6 flex justify-end gap-4 mb-4">
        <GoBackButton href="/users" />
        <EditButton href={`/users/${user.id}/edit`} />
      </div>
      <div className="grid gap-y-4 gap-x-8 grid-cols-[max-content_1fr] rounded-lg bg-gray-100 p-4 md:p-6">
        {/* Username */}
        <div className="mb-8 col-span-2">
          <h1 className="text-3xl font-bold my-2">{user.username}</h1>
          <h2 className="text-base text-gray-500 font-bold my-2">
            {user.email}
          </h2>
        </div>

        {/* Number of Employees */}
        <span className="mb-2 text-sm font-medium">Role : </span>
        <strong>{capitalize(user.role)}</strong>

        {/* Last login */}
        <span className="mb-2 text-sm font-medium">Last login : </span>
        <strong>{user.last_login}</strong>

        {/* Joined at */}
        <span className="mb-2 text-sm font-medium">Joined at : </span>
        <strong>{user.date_joined}</strong>
      </div>
      <form
        action={deleteUserWithId}
        className="mt-6 flex justify-end gap-4 mb-4"
      >
        <DeleteButton />
      </form>
    </>
  );
}
