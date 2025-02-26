import EditEmployeeForm from "@/app/ui/employees/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {
  retrieveEmployee,
  fetchCompanies,
  fetchDepartments,
} from "@/app/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const employee = await retrieveEmployee(id);
  const companies = await fetchCompanies();
  const departments = await fetchDepartments();
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
        employee={employee}
        companies={companies.results}
        departments={departments.results}
      />
    </main>
  );
}
