import EditCompanyForm from "@/app/ui/companies/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveCompany } from "@/app/lib/data";
import { company } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

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
            label: "edit",
            href: `/companies/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCompanyForm company={company as company} />
    </main>
  );
}
