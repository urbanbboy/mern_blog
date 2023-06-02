import { Router } from 'express';
import {register, login, getMe} from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router()

//register
//http://localhost:3005/api/auth/register
router.post('/register', register)

//Log in(authentication)
router.post('/login', login)

//Get me
router.get('/me', checkAuth, getMe)

export default router;