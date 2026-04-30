import express from "express";
import authRoute from "./auth.js";
import adminRoute from './admin.js'

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin',adminRoute);

export default router;