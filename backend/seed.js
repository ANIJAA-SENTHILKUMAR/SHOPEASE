require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  { name: "Wireless Headphones", category: "Electronics", price: 79.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", description: "Premium wireless headphones with noise cancellation.", stock: 50 },
  { name: "Smart Watch",         category: "Electronics", price: 199.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", description: "Feature-rich smartwatch with health tracking.", stock: 30 },
  { name: "Bluetooth Speaker",   category: "Electronics", price: 49.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", description: "Portable Bluetooth speaker with 360° sound.", stock: 80 },
  { name: "Laptop Stand",        category: "Electronics", price: 34.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop", description: "Ergonomic aluminum laptop stand.", stock: 60 },
  { name: "Running Shoes",       category: "Sports",      price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", description: "Lightweight running shoes for all terrains.", stock: 45 },
  { name: "Yoga Mat",            category: "Sports",      price: 29.99, image: "https://images.unsplash.com/photo-1601925228008-f5e4c5e5b8e4?w=400&h=300&fit=crop", description: "Non-slip eco-friendly yoga mat.", stock: 70 },
  { name: "Casual T-Shirt",      category: "Fashion",     price: 24.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "Comfortable 100% cotton casual t-shirt.", stock: 100 },
  { name: "Denim Jacket",        category: "Fashion",     price: 69.99, image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=300&fit=crop", description: "Classic denim jacket for all seasons.", stock: 35 },
  { name: "Sunglasses",          category: "Fashion",     price: 39.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop", description: "UV400 polarized sunglasses.", stock: 55 },
  { name: "Ceramic Mug",         category: "Home & Living", price: 14.99, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop", description: "Handcrafted ceramic mug, 350ml.", stock: 90 },
  { name: "Scented Candle",      category: "Home & Living", price: 19.99, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=300&fit=crop", description: "Soy wax scented candle, 40hr burn time.", stock: 75 },
  { name: "Throw Pillow",        category: "Home & Living", price: 22.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop", description: "Soft decorative throw pillow, 45x45cm.", stock: 65 },
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await User.deleteMany();

  await Product.insertMany(products);
  console.log(`✅ ${products.length} products seeded`);

  await User.create({ name: "Admin User", email: "admin@example.com", password: "CHANGE_THIS_PASSWORD", isAdmin: true });
  await User.create({ name: "John Doe", email: "john@example.com", password: "CHANGE_THIS_PASSWORD" });
  console.log("✅ Users seeded successfully");

  mongoose.connection.close();
};

seed().catch((err) => { console.error(err); process.exit(1); });