import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveCompany } from "@/app/lib/data";
import { company } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import CompanyDetails from "@/app/ui/companies/Details";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const company = await retrieveCompany(id);

  if (!company) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Companies", href: "/companies" },
          {
            label: `${company.name}`,
            href: `/companies/${company.name}`,
            active: true,
          },
        ]}
      />
      <CompanyDetails company={company as company} />
    </main>
  );
}
