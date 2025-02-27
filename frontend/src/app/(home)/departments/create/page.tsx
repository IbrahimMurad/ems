import Form from "@/app/ui/departments/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCompanies } from "@/app/lib/data";
import { companiesList } from "@/app/lib/definitions";

export default async function Page() {
  const companies = await fetchCompanies();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Departments", href: "/departments" },
          {
            label: "create",
            href: "/departments/create",
            active: true,
          },
        ]}
      />
      <Form companies={(companies as companiesList).results} />
    </main>
  );
}
