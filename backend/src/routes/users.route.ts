import { Router } from 'express';
import { createUser, getUserById, getUsers, updateUser, deleteUser } from '../controllers/users.controller';

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;