import express from "express";
import ItemController from "../controllers/ItemController.js";

const router = express.Router();

router.get('/', ItemController.getAll);
router.get('/trands', ItemController.getTrands);
router.get('/:id', ItemController.getOne);
router.post('/', ItemController.create);

export default router;