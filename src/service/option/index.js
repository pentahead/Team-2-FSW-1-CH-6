export const getOption = async (optionName) => {
  const token = localStorage.getItem("token");
  let params;
  if (optionName) {
    params.option_name = optionName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/options` + new URLSearchParams(params);

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

export const getDetailoption = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/options/${id}`;

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
