import express from 'express';
import { greetUser, registerUser, userLogin } from '../controllers/UserControllers.js';
import { autheticateUser } from '../controllers/auth.js';

const router = express.Router();

router.post('/register',  registerUser);
router.post('/login', userLogin);
router.get('/greet', autheticateUser, greetUser);

export default router;