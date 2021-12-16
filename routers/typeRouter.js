import express from "express";
import TypeController from "../controllers/TypeController.js";

const router = express.Router();

router.get('/', TypeController.getAll);
router.get('/:id', TypeController.getOne);
router.post('/', TypeController.create);

export default router;