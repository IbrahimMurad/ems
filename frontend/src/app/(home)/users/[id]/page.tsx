import Breadcrumbs from "@/app/ui/breadcrumbs";
import { retrieveUser } from "@/app/lib/data";
import { user } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import UserDetails from "@/app/ui/users/Details";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const user = await retrieveUser(id);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/users" },
          {
            label: `${user.username}`,
            href: `/users/${user.username}`,
            active: true,
          },
        ]}
      />
      <UserDetails user={user as user} />
    </main>
  );
}
