const BASE_URL = "http://localhost:3000/contacts";

export async function getData() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}
