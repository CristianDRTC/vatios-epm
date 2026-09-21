import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';
import { errorHandler } from './middleware.js';

const app = express();
const port = Number(process.env.PORT || 3001);
const configuredFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = new Set([configuredFrontendUrl, 'http://localhost:5173', 'http://localhost:5174']);

app.use(cors({ origin: (origin, callback) => {
	if (!origin || allowedOrigins.has(origin)) return callback(null, true);
	return callback(new Error('Origen no permitido por CORS'));
} }));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`API disponible en http://localhost:${port}`);
});
