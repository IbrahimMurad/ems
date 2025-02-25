import { fetchCompanies } from "@/app/lib/data";
import CompaniesTable from "@/app/ui/companies/table";
import Search from "@/app/ui/Search";
import { CreateButton } from "@/app/ui/buttons";
import Pagination from "@/app/ui/pagination";

export default async function Page() {
  const companies = await fetchCompanies();
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search companies..." />
        <CreateButton href="/comapnies/create" model="Company" />
      </div>
      <CompaniesTable companies={companies.results} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          count={companies.count}
          next={companies.next}
          previous={companies.previous}
        />
      </div>
    </div>
  );
}
