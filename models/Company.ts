import { PrismaClient, Company as CompanyType, Prisma } from "@prisma/client";
import Joi from 'joi'

const prisma = new PrismaClient();

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
});

export default class Company {
  async getAll(): Promise<CompanyType[]> {
    return prisma.company.findMany();
  }

  async create(data: Prisma.CompanyCreateInput): Promise<CompanyType> {
    try {
      await schema.validateAsync(data);
      return prisma.company.create({ data });
    } catch (err) {
      return err;
    }
  }
}