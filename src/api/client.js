import { create } from "apisauce";

const apiClient = create({
  // baseURL: "https://cors-anywhere.herokuapp.com/https://openapi.keycrm.app/v1",
  baseURL: "https://openapi.keycrm.app/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Bearer NzUyYTg3MjVmOGI0ZTZjMTdjMzFhYWNiNzQxYTBlZDA0YjdjODA3Nw",
  },
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  return response;
};

export default apiClient;
