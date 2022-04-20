import express from 'express';
import { refreshToken } from '../controllers/RefreshToken.js';
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', registerUser);
router.post('/login', loginUser);
router.get('/token', refreshToken);
router.delete('/logout', logoutUser);

export default router;
