import { Item, ItemInfo } from "../models/models.js";

class InfoController {
   getOne = async (req, res) => {
      try {
         const { id } = req.params;

         let info = await ItemInfo.findAll({ where: { itemId: id } })

         return res.json({
            data: info
         })

      } catch (err) {
         return res.status(500).json({
            error: err
         })
      }
   }

   create = async (req, res) => {
      try {
         const { id } = req.params;
         const info = req.body.info;

         if (!info) return res.status(400).send();

         const item = await Item.findOne({ where: { id } })

         if (!item) return res.status(404).send();

         info.forEach(async (info) => {
            console.log("INFOOOOOO", info)
            await ItemInfo.create({ title: info.title, description: info.description, itemId: id })
         })

         item.reload({
            include: {
               model: ItemInfo,
               as: 'info'
            }
         });

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

export default new InfoController();