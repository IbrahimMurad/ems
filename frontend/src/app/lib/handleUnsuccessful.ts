import { redirect } from "next/navigation";

export default function handleUnsuccessful(response: Response) {
  if (response.status === 401) {
    redirect("/login");
  }
  if (response.status === 403) {
    throw new Error("You are not authorized to perform this action");
  }
  if (response.status === 404) {
    throw new Error("Resource not found");
  }
  if (response.status === 500) {
    throw new Error("Internal Server Error");
  }
  throw new Error("Failed to perform the action");
}
