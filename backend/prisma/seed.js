import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const readings = [
	{ kwh: 184.2, cost: 28540, date: new Date('2026-09-01') },
	{ kwh: 201.8, cost: 31270, date: new Date('2026-08-01') },
	{ kwh: 176.4, cost: 27310, date: new Date('2026-07-01') }
];

await prisma.reading.deleteMany();
await prisma.reading.createMany({ data: readings });
await prisma.$disconnect();
