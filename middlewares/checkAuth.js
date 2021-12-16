import { User } from "../models/models.js";
import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
   try {
      const token = req.session.token;

      if (!token) {
         return res.status(401).send();
      }

      const { id } = jwt.decode(token);
      const user = await User.findOne({ where: { id } })

      if (!user) return res.status(404).send();

      req.user = user.toJSON();

      next();

   } catch (err) {
      return res.status(500).json({
         error: err
      })
   }
}