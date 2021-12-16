import express from "express";
import UsersController from "../controllers/UsersController.js";
import { registrationValidator } from '../validators/registration.js';

const router = express.Router();

router.post('/registration', registrationValidator, UsersController.registration);
router.post('/login', UsersController.login);
router.get('/auth', UsersController.auth);

export default router;