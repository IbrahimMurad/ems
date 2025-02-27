import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveDepartment } from "@/app/lib/data";
import { department } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import DepartmentDetails from "@/app/ui/departments/Details";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const department = await retrieveDepartment(id);

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
            href: `/departments/${department.name}`,
            active: true,
          },
        ]}
      />
      <DepartmentDetails department={department as department} />
    </main>
  );
}
