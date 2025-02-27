import EditDepartmentForm from "@/app/ui/departments/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveDepartment, fetchCompanies } from "@/app/lib/data";
import { companiesList, department } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const department = await retrieveDepartment(id);
  const companies = await fetchCompanies();

  if (!department) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Departments", href: "/departments" },
          {
            label: `${department.name}`,
            href: `/departments/${department.id}`,
          },
          {
            label: "edit",
            href: `/departments/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditDepartmentForm
        department={department as department}
        companies={(companies as companiesList).results}
      />
    </main>
  );
}
