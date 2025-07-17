import mongoose from 'mongoose';

const logisticSchema = new mongoose.Schema({
  parcelService: {
    type: String,
    required: true,
    unique: true
  },
  branch: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

// Pre-save middleware to auto-increment order number
logisticSchema.pre('save', async function(next) {
  next();
});

export const Logistic = mongoose.model('Logistic', logisticSchema);