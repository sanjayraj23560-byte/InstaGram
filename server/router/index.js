import { Router } from "express";
import user from "./userRouter.js";
import { loginUser } from '../controllers/authController.js'

const router = Router();
router.use('/login', loginUser)
router.use('/user', user)

export default router;
