import express from "express";
import CartController from "../controllers/CartController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post('/:id', checkAuth, CartController.addCartItem);
router.get('/', checkAuth, CartController.getCartItems);
router.delete('/:id', checkAuth, CartController.deleteCartItem);

export default router;