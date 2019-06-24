import { Router } from 'express';

import { newUser, loginUser, logout, getUsers, getUser, deleteUser, updateUser, forgotPassword, resetPassword } from '../controllers/user.controller';

const router = Router();

router.post('/register', newUser);
router.post('/login', loginUser);
router.post('/logout', logout);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);

export default router;