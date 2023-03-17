const userSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		about: { type: 'string' },
		avatar: { type: 'string' },
		_id: { type: 'string' },
	},
	additionalProperties: false,
};

const usersSchema = {
	type: 'array',
	items: userSchema,
};

const cardSchema = {
	type: 'object',
	properties: {
		likes: usersSchema,
		_id: { type: 'string' },
		name: { type: 'string' },
		link: { type: 'string' },
		owner: userSchema,
		createdAt: { type: 'string' },
	},
	additionalProperties: false,
};

const cardsSchema = {
	type: 'array',
	items: cardSchema,
};

export { userSchema, usersSchema, cardSchema, cardsSchema };
