import path from 'node:path';
import { helperBuilder } from './utils';

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
		return parsedData;
	},
});

const getUser = helperBuilder.getData({
	filePath: USERS_PATH,
	dataHandler({ data, request }) {
		const parsedData: UserData[] = JSON.parse(data);
		const userData: unknown = parsedData.find((user: UserData) => user._id === request?.params.id);
		return userData;
	},
});

const getCards = helperBuilder.getData({
	filePath: CARDS_PATH,
	dataHandler({ data }) {
		const parsedData: unknown = JSON.parse(data);
		return parsedData;
	},
});

export { getUsers, getUser, getCards };
