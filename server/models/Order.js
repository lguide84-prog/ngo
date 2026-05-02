// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    quantity: { type: Number, required: true }
  }],
  amount: { type: Number, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  status: { type: String, default: 'Order Placed' },
  paymentType: { type: String, required: true, default: 'Online' },
  isPaid: { type: Boolean, required: true, default: false },  // ✅ FALSE by default
  paymentVerified: { type: Boolean, default: false },         // ✅ New field
  paymentStatus: { type: String, default: 'pending' },        // ✅ New field (pending/verified/failed)
  paymentVerifiedAt: { type: Date },                          // ✅ New field
  transactionId: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);
export default Order;