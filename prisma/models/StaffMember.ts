import {
  PrismaClient,
  StaffMember as StaffMemberType,
  Prisma,
} from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  companyId: Joi.number().positive().required(),
});

export default class StaffMember {
  async getAll(): Promise<StaffMemberType[]> {
    return prisma.staffMember.findMany();
  }

  async create(data: Prisma.StaffMemberUncheckedCreateInput): Promise<StaffMemberType> {
      await schema.validateAsync(data);
      return prisma.staffMember.create({ data });
  }
}
