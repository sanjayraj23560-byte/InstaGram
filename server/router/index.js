import { Router } from "express";
import user from "./userRouter.js";
import login from './loginRouter.js'

const router = Router();
router.use('/login', login)
router.use('/user', user)

export default router;
