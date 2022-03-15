import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const testCompany1 = await prisma.company.create({
    data: {
      name: "Test Company 1",
    },
  });

  const testMember11 = await prisma.staffMember.create({
    data: {
      firstName: "Company 1 Name User 1",
      lastName: "company 1 last name 1",
      companyId: testCompany1.id,
    },
  });

  const testMember12 = await prisma.staffMember.create({
    data: {
      firstName: "Company 1 Name User 2",
      lastName: "company 1 last name 2",
      companyId: testCompany1.id,
    },
  });

  const testCompany2 = await prisma.company.create({
    data: {
      name: "Test Company 2",
    },
  });

  const testMember21 = await prisma.staffMember.create({
    data: {
      firstName: "Company 2 Name User 1",
      lastName: "company 2 last name 1",
      companyId: testCompany2.id,
    },
  });

  const testMember22 = await prisma.staffMember.create({
    data: {
      firstName: "Company 2 Name User 2",
      lastName: "company 2 last name 2",
      companyId: testCompany1.id,
    },
  });

  await prisma.appointment.create({
    data: {
      startDate: new Date("2022-03-15T18:00:00+0000"),
      endDate: new Date("2022-03-15T19:00:00+0000"),
      companyId: testCompany1.id,
      staffMemberId: testMember11.id,
    },
  });

  await prisma.appointment.create({
    data: {
      startDate: new Date("2022-03-16T17:00:00+0000"),
      endDate: new Date("2022-03-16T19:00:00+0000"),
      companyId: testCompany1.id,
      staffMemberId: testMember12.id,
    },
  });

  await prisma.appointment.create({
    data: {
      startDate: new Date("2022-03-17T20:00:00+0000"),
      endDate: new Date("2022-03-17T22:00:00+0000"),
      companyId: testCompany2.id,
      staffMemberId: testMember21.id,
    },
  });

  await prisma.appointment.create({
    data: {
      startDate: new Date("2022-03-18T08:00:00+0000"),
      endDate: new Date("2022-03-18T22:12:00+0000"),
      companyId: testCompany2.id,
      staffMemberId: testMember22.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
