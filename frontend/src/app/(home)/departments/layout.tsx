import React from "react";
import CommonLayout from "@/app/ui/CommonLayout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommonLayout pageTitle="Departments">{children}</CommonLayout>;
}
