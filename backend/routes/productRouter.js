const express = require("express");

const {
  getProducts,
  createProduct,
  updateProduct,
  StockControl,
  uploadImages,
  deleteProduct,
} = require("../controllers/productController");
const { authControl, authAdmin } = require("../controllers/authController");

const router = express.Router(); /* create new router */
router
  .get("/bitik-urunler", authControl, authAdmin, StockControl)

  .get("/:type/:id?", getProducts)

  /*restrict to admin*/
  .post("/", authControl, authAdmin, uploadImages, createProduct) //TODO
  .patch("/:id", authControl, authAdmin, updateProduct)
  .delete("/:id", authControl, authAdmin, deleteProduct);
module.exports = router;
