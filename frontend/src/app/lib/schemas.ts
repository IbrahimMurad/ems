import { z } from "zod";

const UserSchema = z.object({
  email: z
    .string({ invalid_type_error: "Email must be a string." })
    .nonempty({ message: "Email must not be empty." })
    .email({ message: "Email must be a valid email address." }),
  username: z
    .string({ invalid_type_error: "Username must be a string." })
    .nonempty({ message: "Username must not be empty." })
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(200, { message: "Username must be maximum 200 characters long." }),
  role: z.enum(["admin", "manager", "employee"], {
    message: "Role must be one of Admin, Manager, or Employee.",
  }),
  password: z
    .string({ invalid_type_error: "Password must be a string." })
    .nonempty({ message: "Password must not be empty." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(256, { message: "Password must be maximum 256 characters long." }),
});

const CompanySchema = z.object({
  name: z
    .string({ invalid_type_error: "Please provide a name." })
    .nonempty({ message: "Name must not be empty." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(200, { message: "Name must be maximum 200 characters long." }),
});

const DepartmentSchema = z.object({
  company: z
    .string({ invalid_type_error: "Please select a company." })
    .nonempty({ message: "Company must not be empty." })
    .uuid({ message: "Company must be a valid UUID." }),
  name: z
    .string({ invalid_type_error: "Please provide a name." })
    .nonempty({ message: "Name must not be empty." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(200, { message: "Name must be maximum 200 characters long." }),
});

const EmployeeSchema = z.object({
  company: z
    .string({ invalid_type_error: "Please select a company." })
    .uuid({ message: "Company must be a valid UUID" }),
  department: z
    .string({
      invalid_type_error: "Please select a department.",
    })
    .uuid({ message: "Department must be a valid UUID" }),
  name: z
    .string({ invalid_type_error: "Name must be a string." })
    .nonempty({ message: "Name must not be empty." })
    .max(200, { message: "Name must be maximum 200 charachters long." })
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z
    .string({ invalid_type_error: "Email must be a string." })
    .nonempty({ message: "Email must not be empty." })
    .email({ message: "Email must be a valid email address." }),
  mobile_number: z
    .string()
    .nonempty({ message: "Mobile number must not be empty." })
    .max(15, { message: "Mobile number must be maximum 15 characters long." })
    .min(9, { message: "Mobile number must be at least 9 characters long." })
    .regex(/^\+?1?\d{9,15}$/, {
      message: "Mobile number must be a valid phone number.",
    }),
  status: z.enum(
    ["application_received", "interview_scheduled", "hired", "not_accepted"],
    {
      message:
        "Status must be one of application_received, interview_scheduled, hired, not_accepted",
    }
  ),
  address: z.string().optional(),
  designation: z.string().optional(),
});

export const CreateCompany = CompanySchema;
export const CreateDepartment = DepartmentSchema;
export const CreateEmployee = EmployeeSchema;

export const UpdateCompany = CompanySchema.partial();
export const UpdateDepartment = DepartmentSchema.partial();
export const UpdateEmployee = EmployeeSchema.partial();

export const CreateUser = UserSchema.extend({
  confirm_password: z
    .string({ invalid_type_error: "Confirm password must be a string." })
    .nonempty({ message: "Confirm password must not be empty." }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords must match",
  path: ["confirm_password"],
});

export const UpdateUser = UserSchema.omit({
  password: true,
});
