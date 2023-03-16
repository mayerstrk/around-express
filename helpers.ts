import { promises as fsPromises } from 'node:fs';
import path from 'node:path';
import { type Request, type Response } from 'express';

import usersData from './data/users.json';
import cardsData from './data/cards.json';

const USERS_PATH = path.join(__dirname, 'data/users.json');

type Helper = (request: Request, response: Response) => void;

type UserData = {
	name: string;
	about: string;
	avatar: string;
	_id: string;
};

const getUsers: Helper = (request, response) => {
	response.send(usersData as UserData[]);
};

const getUser: Helper = (request, response) => {
	fsPromises.readFile(USERS_PATH, { encoding: 'utf8' }).then(users => {
		const parsedUserData: UserData[] = JSON.parse(users);
		const user = parsedUserData.find(user => user._id === request.params.id);
		if (user) {
			response.send(user);
		} else {
			response.status(404);
			response.send({ message: 'User not found' });
		}
	})
		.catch(() => {
			response.status(500);
			response.send({ message: 'Unexpected error' });
		});
};

const getCards: Helper = (request, response) => {
	response.send(cardsData);
};

export { getUsers, getUser, getCards };
