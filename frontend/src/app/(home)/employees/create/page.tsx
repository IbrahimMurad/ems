import Form from "@/app/ui/employees/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCompanies, fetchDepartments } from "@/app/lib/data";

export default async function Page() {
  const companies = await fetchCompanies();
  const departments = await fetchDepartments();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "employees", href: "/employees" },
          {
            label: "create employee",
            href: "/employees/create",
            active: true,
          },
        ]}
      />
      <Form companies={companies.results} departments={departments.results} />
    </main>
  );
}
