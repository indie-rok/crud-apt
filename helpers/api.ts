import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1000,
});

async function getCompanies() {
  const result = await apiClient.get("/companies");
  return result.data;
}

async function createCompany(newCompanyName) {
  return apiClient.post("/companies", { name: newCompanyName });
}

export { apiClient, getCompanies, createCompany };
