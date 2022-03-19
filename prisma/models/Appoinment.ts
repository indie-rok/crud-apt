import {
  PrismaClient,
  Appointment as AppointmentType,
  Prisma,
} from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const schema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  companyId: Joi.number().positive().required(),
  staffMemberId: Joi.number().positive().required(),
});

export default class Appointment {
  async getAll(): Promise<AppointmentType[]> {
    return prisma.appointment.findMany({
      include: { staffMember: true, company: true },
    });
  }

  async create(
    data: Prisma.AppointmentUncheckedCreateInput
  ): Promise<AppointmentType> {
    await schema.validateAsync(data);
    return prisma.appointment.create({ data });
  }
}
