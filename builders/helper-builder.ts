import { promises as fsPromises } from 'node:fs';
import { type Request, type Response } from 'express';
import { type ValidateFunction } from 'ajv';
import { Status, ErrorCode, Resource } from '../utils';

type GetDataArgs = {
	filePath: string;
	settings?: { encoding: BufferEncoding };
	dataHandler({ data, request, response }: { data: string; request?: Request; response?: Response }): {
		expectedResource: string;
		parsedData: unknown;
		schemaValidator: ValidateFunction;
	};
};

const helperBuilder = {
	getData({ filePath, dataHandler }: GetDataArgs) {
		return (request: Request, response: Response) => {
			fsPromises
				.readFile(filePath, { encoding: 'utf8' })
				.then(data => {
					const { expectedResource, parsedData, schemaValidator: isSchemaCompliant } = dataHandler({ data, request });
					if (!parsedData) {
						let message;
						if (expectedResource === Resource.user) {
							message = 'User not found';
						}

						throw new Error(message ?? 'Resource not found', {
							cause: { code: ErrorCode.noData, value: parsedData, status: Status.notFound },
						});
					}

					if (!isSchemaCompliant(parsedData)) {
						throw new Error('Does not conform to required schema', {
							cause: {
								code: ErrorCode.unvalidSchema,
								value: parsedData,
								status: Status.internalServerError,
							},
						});
					}

					response.status(Status.ok);
					response.send(parsedData);
				})
				.catch(error => {
					response.status(error.cause.status);
					response.send({
						message: error.message ?? 'Unexpected error',
						status: error.cause?.status ?? 500,
						cause: error.cause ?? undefined,
					});
				});
		};
	},
};

export default helperBuilder;
