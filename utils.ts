const enum Status {
	notFound = 404,
	internalServerError = 500,
	ok = 200,
}

const enum ErrorCode {
	noData = 'noData',
	unvalidSchema = 'unvalidSchema',
}

const enum Resource {
	user = 'user',
	users = 'users',
	cards = 'cards',
}

export { Status, ErrorCode, Resource };
