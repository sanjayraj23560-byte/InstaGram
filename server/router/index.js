import { Router } from "express";
import user from "./userRouter.js";

const router = Router();

router.use('/user', user)

export default router;
