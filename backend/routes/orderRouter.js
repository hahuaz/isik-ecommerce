const express = require("express");

const { authControl, authAdmin } = require("../controllers/authController");
const {
  initPayForm,
  createOrder,
  getOrders,
  updateOrder,
  getSiparislerim,
} = require("../controllers/orderController");

const router = express.Router();

router
  .post("/initPayForm", authControl, initPayForm)

  /* create order call will come from iysipay. so it won't have token. don't add auth controll */
  .post("/createOrder", createOrder)
  .get("/siparislerim/:id", authControl, getSiparislerim)

  /* restrict to admin */
  .get("/:gonderildi", authControl, authAdmin, getOrders)
  .patch("/", authControl, authAdmin, updateOrder);

module.exports = router;
