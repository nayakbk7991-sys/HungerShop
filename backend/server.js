const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("HungerShop backend is working properly!");
});

app.use('/api/auth', require('./routes/authRoutes'));   
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes.js'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/analyticsRoutes.js'));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});