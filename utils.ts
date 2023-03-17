import { promises as fsPromises } from 'node:fs';
import { type Request, type Response } from 'express';

const enum Status {
	notFound = 404,
	internalServerError = 500,
	ok = 200,
}

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
					response.status(Status.ok);
					response.send(parsedData);
				})
				.catch(() => {
					response.status(Status.internalServerError);
					response.send({ message: 'unexpected error' });
				});
		};
	},
};

export { Status, helperBuilder };
