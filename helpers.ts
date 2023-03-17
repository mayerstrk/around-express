import path from 'node:path';
import { type Request, type Response } from 'express';
import { helperBuilder } from './utils';

const USERS_PATH = path.join(__dirname, 'data/users.json');
const CARDS_PATH = path.join(__dirname, 'data/cards.json');

type Helper = (request: Request, response: Response) => void;

type UserData = {
	name: string;
	about: string;
	avatar: string;
	_id: string;
};

const getUsers: Helper = (request, response) => {
	helperBuilder.getData({
		response,
		filePath: USERS_PATH,
		dataHandler(data) {
			const parsedData: unknown = JSON.parse(data);
			return parsedData;
		},
	});
};

const getUser: Helper = (request, response) => {
	helperBuilder.getData({
		response,
		filePath: USERS_PATH,
		dataHandler(data) {
			const parsedData: UserData[] = JSON.parse(data);
			const userData: unknown = parsedData.find((user: UserData) => user._id === request.params.id);
			return userData;
		},
	});
};

const getCards: Helper = (request, response) => {
	helperBuilder.getData({
		response,
		filePath: CARDS_PATH,
		dataHandler(data) {
			const parsedData: unknown = JSON.parse(data);
			return parsedData;
		},
	});
};

export { getUsers, getUser, getCards };
