import { fetchUsers } from "@/app/lib/data";
import UsersTable from "@/app/ui/users/table";
import Search from "@/app/ui/Search";
import { CreateButton } from "@/app/ui/buttons";
import Pagination from "@/app/ui/pagination";
import { notFound } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const users = await fetchUsers(currentPage, search);

  if (!users) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
        <CreateButton href="/users/create" model="User" />
      </div>
      <UsersTable users={users.results} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination count={users.count} />
      </div>
    </div>
  );
}
