// pages/api/hello.js
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import Company from "../../../../prisma/models/Company";

export const config = {
  api: {
    bodyParser: true,
  },
};

const companyInstance = new Company();

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  try {
    res.send((await companyInstance.getStaffMembers(req.query.id)) || []);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default handler;
