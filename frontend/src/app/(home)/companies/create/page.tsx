import Form from "@/app/ui/companies/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Companies", href: "/companies" },
          {
            label: "create",
            href: "/companies/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
