import express from 'express';
import { getAllLogistics } from '../controllers/logisticController.js'

const router = express.Router();

router.get('/', getAllLogistics);

export default router;