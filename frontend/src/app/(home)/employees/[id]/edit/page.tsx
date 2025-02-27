import EditEmployeeForm from "@/app/ui/employees/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {
  retrieveEmployee,
  fetchCompanies,
  fetchDepartments,
} from "@/app/lib/data";
import {
  companiesList,
  departmentsList,
  employee,
} from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const employee = await retrieveEmployee(id);
  const companies = await fetchCompanies();
  const departments = await fetchDepartments();

  if (!employee) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Employees", href: "/employees" },
          {
            label: "Edit Employee",
            href: `/employees/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditEmployeeForm
        employee={employee as employee}
        companies={(companies as companiesList).results}
        departments={(departments as departmentsList).results}
      />
    </main>
  );
}
