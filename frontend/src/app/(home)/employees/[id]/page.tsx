import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveEmployee } from "@/app/lib/data";
import { employee } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import EmployeeDetails from "@/app/ui/employees/Details";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const employee = await retrieveEmployee(id);

  if (!employee) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Employees", href: "/employees" },
          {
            label: `${employee.name}`,
            href: `/employees/${employee.name}`,
            active: true,
          },
        ]}
      />
      <EmployeeDetails employee={employee as employee} />
    </main>
  );
}
