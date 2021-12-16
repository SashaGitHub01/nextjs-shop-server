import express from "express";
import { sequelize } from "../db.js";
import { Item, ItemInfo } from "../models/models.js";
import { v4 } from 'uuid';
import path from "path";
import { __dirname } from "../index.js";

class ItemController {
   getAll = async (req, res) => {
      try {
         let { typeId, brandId, limit, page } = req.query;
         let items;

         page = page || 1;
         limit = limit || 9;

         const offset = page * limit - limit;

         if (!brandId && !typeId) {
            items = await Item.findAndCountAll({ offset, limit });
         }

         if (brandId && !typeId) {
            items = await Item.findAndCountAll({ where: { brandId }, offset, limit });
         }

         if (!brandId && typeId) {
            items = await Item.findAndCountAll({ where: { typeId }, offset, limit });
         }

         if (brandId && typeId) {
            items = await Item.findAndCountAll({ where: { brandId, typeId }, offset, limit });
         }

         if (!items) return res.status(404).send();



         return res.json({
            data: items
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
         const item = await Item.findOne({
            where: { id: id },
            include: { model: ItemInfo, as: 'info' }
         });

         if (!item) return res.status(404).send();

         return res.json({
            data: item
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

   create = async (req, res) => {
      try {
         let { name, price, info, brandId, typeId } = req.body;
         const { image } = req.files;

         if (!image) return res.status(400).send();

         const ext = '.' + image.name.split('.')[1];
         const fileName = v4() + ext;

         await image.mv(path.resolve(__dirname, 'static', fileName));

         const data = {
            name,
            price,
            image: fileName,
            brandId,
            typeId
         }

         const item = await Item.create(data);

         if (!item) return res.status(500).send();

         if (info) {
            info = JSON.parse(info);

            info.forEach(async (i) => {
               await ItemInfo.create({
                  title: i.title,
                  description: i.description,
                  itemId: item.id
               })
            })
         }

         return res.json({
            data: item
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

}

export default new ItemController();