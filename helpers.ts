import path from 'node:path';
import helperBuilder from './builders/helper-builder';
import validators from './data/schemas/validators';

const USERS_PATH = path.join(__dirname, 'data/users.json');
const CARDS_PATH = path.join(__dirname, 'data/cards.json');

type UserData = {
	name: string;
	about: string;
	avatar: string;
	_id: string;
};

const getUsers = helperBuilder.getData({
	filePath: USERS_PATH,
	dataHandler({ data }) {
		const parsedUsersData: unknown = JSON.parse(data);
		return { expectedResource: 'users', parsedData: parsedUsersData, schemaValidator: validators.usersData };
	},
});

const getUser = helperBuilder.getData({
	filePath: USERS_PATH,
	dataHandler({ data, request }) {
		const parsedUsersData: UserData[] = JSON.parse(data);
		const userData: unknown = parsedUsersData.find(user => user._id === request?.params.id);
		return { expectedResource: 'user', parsedData: userData, schemaValidator: validators.userData };
	},
});

const getCards = helperBuilder.getData({
	filePath: CARDS_PATH,
	dataHandler({ data }) {
		const parsedCardsData: unknown = JSON.parse(data);
		return { expectedResource: 'cards', parsedData: parsedCardsData, schemaValidator: validators.cardsData };
	},
});

export { getUsers, getUser, getCards };
