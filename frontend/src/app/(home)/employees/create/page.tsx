import Form from "@/app/ui/employees/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCompanies, fetchDepartments } from "@/app/lib/data";
import { companiesList, departmentsList } from "@/app/lib/definitions";

export default async function Page() {
  const companies = await fetchCompanies();
  const departments = await fetchDepartments();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Employees", href: "/employees" },
          {
            label: "create",
            href: "/employees/create",
            active: true,
          },
        ]}
      />
      <Form
        companies={(companies as companiesList).results}
        departments={(departments as departmentsList).results}
      />
    </main>
  );
}
