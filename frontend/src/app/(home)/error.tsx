"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // The following implementation is a workaround for the issue with reset function
  // Since it does not reload the UI as intended
  // This solution comes from the following discussion:
  // https://github.com/vercel/next.js/discussions/45829
  const router = useRouter();
  const reload = () => {
    const url = new URL(window.location.href);
    router.push(url.origin + url.pathname);
    router.refresh();
    startTransition(() => reset());
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <p className="text-red-700 bg-red-500/25 mt-2 rounded-lg py-2 px-4">
        Somthing went wrong while fetching the data. Please try again.
      </p>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={reload}
      >
        Try again
      </button>
    </main>
  );
}
