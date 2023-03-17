import { promises as fsPromises } from 'node:fs';
import { type Request, type Response } from 'express';

const enum Status {
	notFound = 404,
	internalServerError = 500,
	ok = 200,
}

type GetDataArgs = {
	request?: Request;
	response: Response;
	filePath: string;
	settings?: { encoding: BufferEncoding };
	dataHandler(data: string): unknown;
};

const helperBuilder = {
	getData(
		{ response,
			filePath,
			dataHandler,
		}: GetDataArgs,
	) {
		fsPromises.readFile(filePath, { encoding: 'utf8' })
			.then(data => {
				const parsedData = dataHandler(data);
				response.status(Status.ok);
				response.send(parsedData);
			})
			.catch(() => {
				response.status(Status.internalServerError);
				response.send({ message: 'unexpected error' });
			});
	},
};

export { Status, helperBuilder };
