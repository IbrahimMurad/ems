import { PlusIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

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

export function EditButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-lg font-medium text-gray-50 transition-colors hover:bg-gray-500"
    >
      Edit
      <PencilIcon className="ml-4 h-6 w-6" aria-hidden="true" />
    </Link>
  );
}

export function GoBackButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-base font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      <ArrowLeftIcon className=" mr-2 h-5 w-5" aria-hidden="true" />
      Go back
    </Link>
  );
}

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="rounded-lg px-6 py-2 bg-red-900 text-lg font-bold text-gray-100 hover:bg-red-700"
    >
      <TrashIcon className="h-6 w-6 inline mr-2" aria-hidden="true" />
      Delete
    </button>
  );
}
