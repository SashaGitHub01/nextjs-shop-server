import express from 'express';
import InfoController from '../controllers/InfoController.js';

const router = express.Router();

router.get('/:id', InfoController.getOne)
router.post('/:id', InfoController.create)

export default router;