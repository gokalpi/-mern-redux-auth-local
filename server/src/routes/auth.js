import express from 'express';

import * as AuthController from '../controllers/auth.js';
import { loginValidation, registerValidation } from '../validations/auth.js';

import requireJwtAuth from '../middleware/requireJwtAuth.js';
import requireLocalAuth from '../middleware/requireLocalAuth.js';

const router = express.Router();

// Local login
router.get('/current', requireJwtAuth, AuthController.getCurrentUser);
router.post('/login', loginValidation, requireLocalAuth, AuthController.login);
router.get('/logout', requireJwtAuth, AuthController.logout);
router.post('/register', registerValidation, AuthController.register);

export default router;
