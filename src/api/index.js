const BASE_URL = "http://localhost:3000/contacts";

export async function getData() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function addData(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(BASE_URL, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function deleteById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function changeUserName(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}
