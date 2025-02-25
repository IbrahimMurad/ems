import React from "react";
import CommonLayout from "@/app/ui/CommonLayout";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommonLayout pageTitle="Employee">{children}</CommonLayout>;
}
