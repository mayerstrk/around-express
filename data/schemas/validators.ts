import Ajv, { type ValidateFunction } from 'ajv';
import { userSchema, usersSchema, cardsSchema } from './schemas';

const ajv = new Ajv();

const validators = {
	userData: ajv.compile(userSchema),
	usersData: ajv.compile(usersSchema),
	cardData: ajv.compile(cardsSchema),
};

function validateData(data: unknown, validator: ValidateFunction) {
	if (data && !validator(data)) {
		throw new Error('Does not conform to required schema');
	}

	return data;
}

export { validators };
export default validateData;
