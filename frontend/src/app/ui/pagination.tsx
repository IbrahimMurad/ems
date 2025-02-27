"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/app/lib/utils";
import { useSearchParams, usePathname } from "next/navigation";

export default function Pagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const numberOfPages = Math.ceil(count / 10) || 1;

  const previous = currentPage > 1 ? createPageURL(currentPage - 1) : null;
  const next =
    currentPage < numberOfPages ? createPageURL(currentPage + 1) : null;

  const allPages = generatePagination(currentPage, numberOfPages);
  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={previous || "#"}
          isDisabled={previous === null}
        />

        <div className="flex -space-x-px">
          {allPages.map((page) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (page === 1) position = "first";
            if (page === numberOfPages) position = "last";
            if (numberOfPages === 1) position = "single";
            if (page === "...") position = "middle";
            const href = createPageURL(page);
            return (
              <PaginationNumber
                key={page}
                href={href}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={next || "#"}
          isDisabled={next === null}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-purple-600 border-purple-600 text-white": isActive,
      "hover:bg-purple-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
