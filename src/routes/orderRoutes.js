import express from 'express';
import { validateOrder } from '../middleware/validateOrder.js';
import {
  getAllOrders,
  getOrderByNumber,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderNumber', getOrderByNumber);
router.post('/', validateOrder, createOrder);
router.put('/:orderNumber', validateOrder, updateOrder);
router.delete('/:orderNumber', deleteOrder);

export default router;