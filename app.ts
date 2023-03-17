import process from 'node:process';
import express from 'express';
import routes from './routes';
import { Status } from './utils';

const { PORT = 3000 } = process.env;
const app = express();

app.use('/', routes);

app.use((request, response) => {
	response.status(Status.internalServerError);
	response.send({ message: 'Error: unexpected request' });
});

app.listen(PORT, () => {
	console.log(`Listening on port = ${PORT}.\n URL: http://localhost:${PORT}`);
});

