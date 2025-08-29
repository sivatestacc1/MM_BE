import { Order } from '../models/Order.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderNumber: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByDate = async (req, res) => {
  const dateToFind = new Date(req.body.date);
  const year = dateToFind.getUTCFullYear();
  const month = dateToFind.getMonth();
  const date = dateToFind.getDate();
  const start = new Date(year, month, date-1);
  start.setHours(0,0,0,0);
  const end = new Date(year, month, date);
  try {
    const orders = await Order.find({ 
      orderDate: { $gte: start, $lt: end } 
    }).sort({ orderNumber: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderByNumber = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { orderDate, ...rest } = req.body;
    if (rest.logistics && rest.logistics.billNumber) {
      const order = await Order.findOne({ "logistics.billNumber": rest.logistics.billNumber});
      if (order) {
        return res.status(409).json({ message: 'Order with same bill number is already exists' });
      } else {
        const order = new Order({
          ...rest,
          orderDate: new Date(orderDate),
        });
        // const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
      }
    } else {
      return res.status(400).json({ message: 'Insufficient order information' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      req.body,
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};