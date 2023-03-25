const BASE_URL = "http://localhost:3000/contacts/";

export async function postData(data = {}) {
  // Default options are marked with *
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

export async function getData() {
  const response = await fetch(BASE_URL);

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

export async function deleteData(id) {
  const response = await fetch(BASE_URL + id, {
    method: "DELETE",
    });

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

