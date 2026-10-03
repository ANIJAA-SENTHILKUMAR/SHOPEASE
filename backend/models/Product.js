const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    category:    { type: String, required: true },
    price:       { type: Number, required: true, min: 0 },
    image:       { type: String, required: true },
    description: { type: String, default: "" },
    stock:       { type: Number, default: 100 },
    rating:      { type: Number, default: 0 },
    numReviews:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
