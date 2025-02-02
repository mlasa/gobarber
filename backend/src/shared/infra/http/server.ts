import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm'; // database connection
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		// se o erro for disparado pelo meu código
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	// console.error(err);

	// se o erro for inesperado
	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

app.listen(3333, () => {
	console.log(' Server started on port 3333 (http://localhost:3333)');
	console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
});
