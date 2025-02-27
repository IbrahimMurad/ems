import Form from "@/app/ui/users/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/users" },
          {
            label: "create",
            href: "/users/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
