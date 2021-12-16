import jwt from "jsonwebtoken";
import { Cart, CartItem, User } from "../models/models.js";

class CartController {
   getCartItems = async (req, res) => {
      try {
         const user = req.user;
         const cart = await Cart.findOne({ where: { userId: user.id } });
         const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

         if (!cart) return res.status(400).send();

         return res.json({
            data: cartItems
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

   addCartItem = async (req, res) => {
      try {
         const item = req.body.item;
         const userId = req.user.id;

         if (!item) return res.status(400).send();

         const cart = await Cart.findOne({ where: { userId } });
         const cartItem = await CartItem.create({ cartId: cart.id, itemId: item })

         if (!cart) return res.status(400).send();

         return res.json({
            data: cartItem
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

   deleteCartItem = async (req, res) => {
      try {
         const id = req.params.id;
         const userId = req.user.id;

         const cart = await Cart.findOne({ where: { userId } });

         if (!cart) return res.status(404).send();

         const cartItem = await CartItem.destroy({ where: { id, cartId: cart.id } })

         return res.json({
            data: cartItem
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }
}

export default new CartController();