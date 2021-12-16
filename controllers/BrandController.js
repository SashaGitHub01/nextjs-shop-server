import express from "express";
import { sequelize } from "../db.js";
import { Brand } from "../models/models.js";

class BrandController {
   getAll = async (req, res) => {
      try {
         const brands = await Brand.findAll();

         if (!brands) return res.status(404).send();

         return res.json({
            data: brands
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
         const brand = await Brand.findOne({ where: { id: id } });

         if (!brand) return res.status(404).send();

         return res.json({
            data: brand
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

         const brand = await Brand.create({ name });

         if (!brand) return res.status(500).send();

         return res.json({
            data: brand
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

}

export default new BrandController();