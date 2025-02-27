import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateButton({ href, model }: { href: string; model: string }) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
    >
      <span className="hidden md:block">Create {model}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
