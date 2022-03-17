// pages/api/hello.js
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import Appoinment from "../../../prisma/models/Appoinment";

export const config = {
  api: {
    bodyParser: true,
  },
};

const appointmentInstance = new Appoinment();

interface NextApiRequestWithAppoinment extends NextApiRequest {
  body: Prisma.AppointmentUncheckedCreateInput;
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
      const appointment = await appointmentInstance.create(body);
      res.send(appointment);
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  });

export default handler;
