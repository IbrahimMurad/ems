import Form from "@/app/ui/departments/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCompanies } from "@/app/lib/data";

export default async function Page() {
  const companies = await fetchCompanies();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "departments", href: "/departments" },
          {
            label: "create department",
            href: "/departments/create",
            active: true,
          },
        ]}
      />
      <Form companies={companies.results} />
    </main>
  );
}
