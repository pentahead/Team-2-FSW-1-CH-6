export const getAvailables = async (availableName) => {
  const token = localStorage.getItem("token");
  let params;
  if (availableName) {
    params.available_name = availableName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/availables` + new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getDetailAvailable = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/availables/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};
