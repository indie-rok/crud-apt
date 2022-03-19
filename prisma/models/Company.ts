import { Company as CompanyType, Prisma } from "@prisma/client";
import Joi from "joi";

import prisma from "../../helpers/prismaClient";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export default class Company {
  async getAll(): Promise<CompanyType[]> {
    return prisma.company.findMany();
  }

  async findOne(companyId): Promise<CompanyType> {
    return prisma.company.findUnique({ where: { id: parseInt(companyId) } });
  }

  async getStaffMembers(companyId) {
    return await prisma.company
      .findUnique({ where: { id: parseInt(companyId) } })
      .members();
  }

  async create(data: Prisma.CompanyCreateInput): Promise<CompanyType> {
    await schema.validateAsync(data);
    return prisma.company.create({ data });
  }
}
