import { fetchCompanies } from "@/app/lib/data";
import CompaniesTable from "@/app/ui/companies/table";
import Search from "@/app/ui/Search";
import { CreateButton } from "@/app/ui/buttons";
import Pagination from "@/app/ui/pagination";
import { companiesList } from "@/app/lib/definitions";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const companies = await fetchCompanies(currentPage, search);
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search companies..." />
        <CreateButton href="/companies/create" model="Company" />
      </div>
      <CompaniesTable companies={(companies as companiesList).results} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination count={(companies as companiesList).count} />
      </div>
    </div>
  );
}
