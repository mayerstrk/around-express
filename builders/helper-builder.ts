import { promises as fsPromises } from 'node:fs';
import { type Request, type Response } from 'express';
import { Status } from '../utils';

type GetDataArgs = {
	filePath: string;
	settings?: { encoding: BufferEncoding };
	dataHandler({ data, request, response }: { data: string; request?: Request; response?: Response }): unknown;
};

const helperBuilder = {
	getData(
		{
			filePath,
			dataHandler,
		}: GetDataArgs,
	) {
		return (request: Request, response: Response) => {
			fsPromises.readFile(filePath, { encoding: 'utf8' })
				.then(data => {
					const parsedData = dataHandler({ data, request });
					if (parsedData) {
						response.status(Status.ok);
						response.send(parsedData);
						return;
					}

					response.status(Status.notFound);
					response.send({ message: 'Error: not found' });
				})
				.catch(error => {
					response.status(Status.internalServerError);
					response.send({ message: error.message ?? 'unexpected error' });
				});
		};
	},
};

export default helperBuilder;
