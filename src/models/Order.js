import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
    unique: true
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  invoiceDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: String, required: false },
    phone: { type: String, required: true }
  },
  logistics: {
    parcelServiceName: { type: String, required: true },
    branch: { type: String, required: true },
    billNumber: {type: String, required: true}
  },
  items: [{
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    bagSize: { type: String, required: true },
    isPrinted: { type: Boolean, required: true }
  }]
}, {
  timestamps: true
});

// Pre-save middleware to auto-increment order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastOrder = await this.constructor.findOne({}, {}, { sort: { orderNumber: -1 } });
    this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
  }
  next();
});

export const Order = mongoose.model('Order', orderSchema);