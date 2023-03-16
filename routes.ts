import { Router } from 'express';
import { getUsers, getUser, getCards } from './helpers';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/cards', getCards);

export default router;

