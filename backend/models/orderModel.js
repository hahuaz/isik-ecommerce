const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      reuired: [true, "Fotoğraf girilmeli"],
    },
    netPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    gonderildi: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  { timestamps: true }
);

orderSchema.pre(/^find/, async function (next) {
  // this.populate({
  //   path: "products",
  //   populate: {
  //     path: "productId" /* populate sub-document */,
  //   },
  //   // select: "-__v",
  // }).populate({
  //   path: "user",
  // });
  this.populate({
    path: "user",
  });

  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
