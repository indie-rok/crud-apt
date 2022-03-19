import { StaffMember as StaffMemberType, Prisma } from "@prisma/client";
import Joi from "joi";

import prisma from "../../helpers/prismaClient";

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  companyId: Joi.number().positive().required(),
});

export default class StaffMember {
  async getAll(): Promise<StaffMemberType[]> {
    return prisma.staffMember.findMany();
  }

  async findOne(staffmemberId): Promise<StaffMemberType> {
    return prisma.staffMember.findUnique({
      where: { id: parseInt(staffmemberId) },
    });
  }

  async create(data: Prisma.StaffMemberUncheckedCreateInput): Promise<any> {
    await schema.validateAsync(data);
    const company = await prisma.company.findUnique({
      where: { id: parseInt(data.companyId as any) },
    });

    const user = await prisma.staffMember.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        companyId: company.id,
      },
    });

    return user;
  }
}
