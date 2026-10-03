const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  qty:       { type: Number, required: true },
  price:     { type: Number, required: true },
  image:     { type: String, required: true },
  product:   { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems:     { type: [orderItemSchema], required: true },
    shippingAddress: {
      fullName: { type: String, required: true },
      address:  { type: String, required: true },
      city:     { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentMethod:  { type: String, required: true, default: "Card" },
    itemsPrice:     { type: Number, required: true },
    shippingPrice:  { type: Number, default: 0 },
    totalPrice:     { type: Number, required: true },
    isPaid:         { type: Boolean, default: false },
    paidAt:         { type: Date },
    isDelivered:    { type: Boolean, default: false },
    deliveredAt:    { type: Date },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
