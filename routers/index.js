import express from "express";
import userRouter from './userRouter.js';
import brandRouter from './brandRouter.js';
import itemRouter from './itemRouter.js';
import typeRouter from './typeRouter.js';
import cartRouter from './cartRouter.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/brand', brandRouter);
router.use('/item', itemRouter);
router.use('/type', typeRouter);

export default router;