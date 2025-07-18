import express from 'express';
import { createLogistic, getAllLogistics } from '../controllers/logisticController.js'
import { validateLogistic } from '../middleware/validateLogistic.js';

const router = express.Router();

router.get('/', getAllLogistics);
router.post('/', validateLogistic, createLogistic);

export default router;