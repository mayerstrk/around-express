import path from 'node:path';
import helperBuilder from './builders/helper-builder';
import validators, { validateData } from './data/schemas/validators';

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
		const parsedData: unknown = JSON.parse(data);
		return validateData(parsedData, validators.usersData);
	},
});

const getUser = helperBuilder.getData({
	filePath: CARDS_PATH,
	dataHandler({ data, request }) {
		const parsedData: UserData[] = JSON.parse(data);
		const userData: unknown = parsedData.find(user => user._id === request?.params.id);
		return validateData(userData, validators.userData);
	},
});

const getCards = helperBuilder.getData({
	filePath: CARDS_PATH,
	dataHandler({ data }) {
		const parsedData: unknown = JSON.parse(data);
		return validateData(parsedData, validators.cardData);
	},
});

export { getUsers, getUser, getCards };
