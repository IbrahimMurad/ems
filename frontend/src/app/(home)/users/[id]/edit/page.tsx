import EditUserForm from "@/app/ui/users/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveUser } from "@/app/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const user = await retrieveUser(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/users" },
          {
            label: "Edit User",
            href: `/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditUserForm user={user} />
    </main>
  );
}
