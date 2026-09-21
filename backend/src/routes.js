import { Router } from 'express';
import { prisma } from './db.js';

const router = Router();

router.get('/health', (request, response) => {
	response.json({ status: 'ok', service: 'vatios-api' });
});

router.get('/readings', async (request, response, next) => {
	try {
		const readings = await prisma.reading.findMany({
			orderBy: { date: 'desc' },
			take: 30
		});
		response.json(readings);
	} catch (error) {
		next(error);
	}
});

router.post('/readings', async (request, response, next) => {
	try {
		const { kwh, cost, date } = request.body;
		if (!Number.isFinite(Number(kwh)) || Number(kwh) < 0 || !Number.isFinite(Number(cost)) || Number(cost) < 0) {
			return response.status(400).json({ error: 'kwh y cost deben ser números positivos' });
		}
		const reading = await prisma.reading.create({
			data: { kwh: Number(kwh), cost: Number(cost), ...(date ? { date: new Date(date) } : {}) }
		});
		response.status(201).json(reading);
	} catch (error) {
		next(error);
	}
});

export default router;
