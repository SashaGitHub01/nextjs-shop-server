import express from "express";
import BrandController from "../controllers/BrandController.js";

const router = express.Router();

router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getOne);
router.post('/', BrandController.create);

export default router;