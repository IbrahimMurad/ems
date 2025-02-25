import { fetchDepartments } from "@/app/lib/data";
import DepartmentsTable from "@/app/ui/departments/table";
import Search from "@/app/ui/Search";
import { CreateButton } from "@/app/ui/buttons";
import Pagination from "@/app/ui/pagination";

export default async function Page() {
  const departments = await fetchDepartments();
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search departments..." />
        <CreateButton href="/departments/create" model="Department" />
      </div>
      <DepartmentsTable departments={departments.results} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          count={departments.count}
          next={departments.next}
          previous={departments.previous}
        />
      </div>
    </div>
  );
}
