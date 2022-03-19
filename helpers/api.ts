import axios from "axios";
import { Prisma } from "@prisma/client";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1000,
});

async function getCompanies() {
  const result = await apiClient.get("/companies");
  return result.data;
}

async function getCompanyMembers(number) {
  const result = await apiClient.get(`/companies/${number}/members`);
  return result.data;
}

async function createCompany(newCompanyName: Prisma.CompanyUncheckedCreateInput) {
  return apiClient.post("/companies", { name: newCompanyName });
}

async function getStaffMemebrs() {
  const result = await apiClient.get("/staff_members");
  return result.data;
}

async function createStaffMember(data: Prisma.StaffMemberUncheckedCreateInput) {
  return apiClient.post("/staff_members", data);
}

async function getAppoinments() {
  const result = await apiClient.get("/appointments");
  return result.data;
}

async function createAppoinment(data: Prisma.AppointmentUncheckedCreateInput) {
  return apiClient.post("/appointments", data);
}

export {
  apiClient,
  getCompanies,
  getCompanyMembers,
  createCompany,
  getStaffMemebrs,
  createStaffMember,
  getAppoinments,
  createAppoinment,
};
