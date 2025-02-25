import { fetchEmployees } from "@/app/lib/data";
import EmployeesTable from "@/app/ui/employees/table";
import Search from "@/app/ui/Search";
import { CreateButton } from "@/app/ui/buttons";
import Pagination from "@/app/ui/pagination";

export default async function Page() {
  const employees = await fetchEmployees();
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search employees..." />
        <CreateButton href="/employees/create" model="Employee" />
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <EmployeesTable employees={employees.results} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          count={employees.count}
          next={employees.next}
          previous={employees.previous}
        />
      </div>
    </div>
  );
}
