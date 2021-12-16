import express from "express";
import { sequelize } from "../db.js";
import { Type } from "../models/models.js";

class TypeController {
   getAll = async (req, res) => {
      try {
         const types = await Type.findAll();

         if (!types) return res.status(404).send();

         return res.json({
            data: types
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

   getOne = async (req, res) => {
      try {
         const { id } = req.params;
         const types = await Type.findOne({ where: { id: id } });

         if (!types) return res.status(404).send();

         return res.json({
            data: types
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

   create = async (req, res) => {
      try {
         const { name } = req.body;

         if (!name) return res.status(400).send();

         const type = await Type.create({ name });

         if (!type) return res.status(500).send();

         return res.json({
            data: type
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

}

export default new TypeController();