import EditCompanyForm from "@/app/ui/companies/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveCompany } from "@/app/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const company = await retrieveCompany(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Companies", href: "/companies" },
          {
            label: "Edit Company",
            href: `/companies/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCompanyForm company={company} />
    </main>
  );
}
