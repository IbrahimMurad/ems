"use client";

import {
  UserGroupIcon,
  UserCircleIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { authenticatedUser } from "@/app/lib/definitions";

const links = [
  { name: "Dashboard", href: "/", icon: ChartBarIcon },
  {
    name: "Emplyees",
    href: "/employees",
    icon: UserGroupIcon,
  },
  { name: "Departments", href: "/departments", icon: DocumentDuplicateIcon },
  { name: "Companies", href: "/companies", icon: BuildingOffice2Icon },
  { name: "Users", href: "/users", icon: UserCircleIcon },
];

export default function NavLinks({ user }: { user: authenticatedUser }) {
  const pathname = usePathname();
  if (user.role !== "admin") {
    links.splice(4, 1);
  }
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-fuchsia-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-fuchsia-100 text-purple-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
