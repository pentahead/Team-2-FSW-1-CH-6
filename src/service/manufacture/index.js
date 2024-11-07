export const getManufacture = async (manufactureName) => {
  const token = localStorage.getItem("token");
  let params;
  if (manufactureName) {
    params.manufacture_name = manufactureName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/manufactures` +
    new URLSearchParams(params);

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

export const getDetailManufacture = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/manufactures/${id}`;

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
