import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';
import { errorHandler } from './middleware.js';

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`API disponible en http://localhost:${port}`);
});
