export type authenticatedUser = {
  id: number;
  username: string;
  role: "admin" | "manager" | "employee";
};

export type user = {
  id: number;
  url: string;
  last_login: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  date_joined: string;
  password: string;
  role: "Admin" | "Manager" | "Employee";
};

export type company = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  number_of_departments: number;
  number_of_employees: number;
  url: string;
};

export type department = {
  id: string;
  created_at: string;
  updated_at: string;
  url: string;
  name: string;
  number_of_employees: number;
  company: company;
};

export type employee = {
  id: string;
  created_at: string;
  updated_at: string;
  company: company;
  department: department;
  url: string;
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  designation: string;
  hired_on: string;
  days_employed: number;
  status:
    | "application_received"
    | "interview_scheduled"
    | "hired"
    | "not_accepted";
};

export type statusType = {
  display: string;
  style: string;
};

type statusDisplayAndStyles = {
  application_received: statusType;
  interview_scheduled: statusType;
  hired: statusType;
  not_accepted: statusType;
};

export type usersList = {
  count: number;
  next: string;
  previous: string;
  results: user[];
};

export type companiesList = {
  count: number;
  next: string;
  previous: string;
  results: company[];
};

export type departmentsList = {
  count: number;
  next: string;
  previous: string;
  results: department[];
};

export type employeesList = {
  count: number;
  next: string;
  previous: string;
  results: employee[];
};

export const urls = {
  companies: "http://127.0.0.1:8000/api/companies/",
  departments: "http://127.0.0.1:8000/api/departments/",
  employees: "http://127.0.0.1:8000/api/employees/",
  users: "http://127.0.0.1:8000/api/users/",
};

export const statusStyles: statusDisplayAndStyles = {
  application_received: {
    display: "Application Received",
    style: "bg-yellow-100 text-yellow-800",
  },
  interview_scheduled: {
    display: "Interview Scheduled",
    style: "bg-blue-100 text-blue-800",
  },
  hired: { display: "Hired", style: "bg-green-100 text-green-800" },
  not_accepted: { display: "Not Accepted", style: "bg-red-100 text-red-800" },
};
