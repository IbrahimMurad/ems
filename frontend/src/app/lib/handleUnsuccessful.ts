export default function handleUnsuccessful(response: Response) {
  if (response.status === 401) {
    throw new Error("unauthenticated");
  }
  if (response.status === 403) {
    throw new Error("unauthorized");
  }
  if (response.status === 404) {
    throw new Error("Resource not found.");
  }
  if (response.status === 500) {
    throw new Error("server");
  }
  throw new Error("unknown");
}
