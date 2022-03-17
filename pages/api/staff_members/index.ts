// pages/api/hello.js
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import StaffMember from "../../../prisma/models/StaffMember";

export const config = {
  api: {
    bodyParser: true,
  },
};

const staffMemberInstance = new StaffMember();

interface NextApiRequestWithStaffMember extends NextApiRequest {
  body: Prisma.StaffMemberUncheckedCreateInput;
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
    res.send(await staffMemberInstance.getAll());
  })
  .post(async (req: NextApiRequestWithStaffMember, res) => {
    const { body } = req;
    try {
      const staffMember = await staffMemberInstance.create(body);
      res.send(staffMember);
    } catch (err) {
      res.status(500).send(err);
    }
  });

export default handler;
