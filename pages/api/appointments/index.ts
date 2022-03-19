// pages/api/hello.js
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import Appoinment from "../../../prisma/models/Appoinment";
import Company from "../../../prisma/models/Company";
import StaffMember from "../../../prisma/models/StaffMember";

export const config = {
  api: {
    bodyParser: true,
  },
};

const appointmentInstance = new Appoinment();
const companyInstance = new Company();
const staffMemberInstance = new StaffMember();

interface NextApiRequestWithAppoinment extends NextApiRequest {
  body: {
    companyId: string;
    staffMemberId: string;
    startDate: string;
    endDate: string;
  };
}

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(async (_, res) => {
    res.send(await appointmentInstance.getAll());
  })
  .post(async (req: NextApiRequestWithAppoinment, res) => {
    const { body } = req;

    try {
      const company = await companyInstance.findOne(body.companyId);
      const staffMember = await staffMemberInstance.findOne(body.staffMemberId);

      if (!company || !staffMember) {
        throw new Error("Incorrect data");
      }

      const appointment = await appointmentInstance.create({
        startDate: body.startDate,
        endDate: body.endDate,
        companyId: parseInt(body.companyId),
        staffMemberId: parseInt(body.staffMemberId),
      });

      res.send(appointment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

export default handler;
