// pages/api/hello.js
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import Company from "../../../models/Company";

export const config = {
  api: {
    bodyParser: true,
  },
};

const companyInstance = new Company();

interface NextApiRequestWithCompany extends NextApiRequest {
  body: Prisma.CompanyCreateInput;
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
    res.send(await companyInstance.getAll());
  })
  .post(async (req: NextApiRequestWithCompany, res) => {
    const { body } = req;

    const company = await companyInstance.create(body);

    res.send(company);
  });

export default handler;
