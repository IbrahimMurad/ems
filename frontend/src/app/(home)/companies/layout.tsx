import React from "react";
import CommonLayout from "@/app/ui/CommonLayout";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommonLayout pageTitle="Companies">{children}</CommonLayout>;
}
