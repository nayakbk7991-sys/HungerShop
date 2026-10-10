const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { getProtects, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController"); 
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

const router = express.Router();
// all products
router.route("/").get(getProtects).post(protect, admin, upload.single("image"), createProduct);
// specific product
router.route("/:id").get(getProductById).put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router; 