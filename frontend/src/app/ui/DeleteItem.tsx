"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteItem({ url }: { url: string }) {
  return (
    <button
      type="submit"
      className="text-gray-800 hover:text-red-800 hover:scale-110"
      onClick={async () => {
        await fetch(url, { method: "DELETE" });
        location.reload();
      }}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
