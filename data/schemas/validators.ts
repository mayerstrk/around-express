import Ajv, { type ValidateFunction } from 'ajv';
import { userSchema, usersSchema, cardsSchema } from './schemas';

const ajv = new Ajv();

const validators = {
	userData: ajv.compile(userSchema),
	usersData: ajv.compile(usersSchema),
	cardsData: ajv.compile(cardsSchema),
};

function validateSchema(data: unknown, validator: ValidateFunction) {
	if (!validator(data)) {
		return false;
	}

	return true;
}

export { validateSchema };
export default validators;
