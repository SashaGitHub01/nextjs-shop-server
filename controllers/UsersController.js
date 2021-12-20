import express from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Cart, User } from "../models/models.js";
import { generateHash } from '../utils/generateHash.js';

const generateJwt = (id) => {
   return jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: '30d' })
}

class UsersController {
   registration = async (req, res) => {
      try {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(400).json({
               error: errors,
               data: null
            })
         }

         const { password, email, role } = req.body;

         const checkUser = await User.findOne({ where: { email } })

         if (checkUser) return res.status(400).send();

         const hash = generateHash(password);

         const data = {
            email,
            password: hash,
            role: role || 'USER'
         }

         const user = await User.create(data);

         if (!user) return res.status(400).send();

         const cart = await Cart.create({ userId: user.id });
         const token = generateJwt(user.id);

         req.session.token = token;

         return res.redirect('/api/user/auth')

      } catch (err) {
         return res.status(500).json({
            error: err,
            data: null
         })
      }
   }

   login = async (req, res) => {
      try {
         const { password, email } = req.body;

         const user = await User.findOne({ where: { email } });

         if (!user) return res.status(404).send();

         const pswdHash = generateHash(password);
         const isValid = pswdHash === user.password;

         if (!isValid) return res.status(403).send();

         const token = generateJwt(user.id);

         if (req.session) {
            req.session.token = token;
         }

         const jsonUser = user.toJSON();
         delete jsonUser.password;

         return res.json({
            data: jsonUser
         })

      } catch (err) {
         return res.status(500).json({
            error: err,
            data: null
         })
      }
   }

   auth = async (req, res) => {
      try {
         const { token } = req.session;

         if (!token) return res.status(401).send();

         const { id } = jwt.decode(token);
         const user = await User.findOne({
            where: { id },
            include: Cart,
            attributes: { exclude: 'password' }
         });

         if (!user) return res.status(404).send();

         delete user.password;

         return res.json({
            data: user
         })

      } catch (err) {
         return res.status(500).json({
            error: err,
            data: null
         })
      }
   }

   getUser = async (req, res) => {
      try {

      } catch (err) {
         return res.status(500).json({
            error: err,
            data: null
         })
      }
   }

}

export default new UsersController();