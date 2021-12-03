const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Tür girilmeli"],
      trim: true,
    },
    productName: {
      type: String,
      required: [true, "İsim girilmeli"],
      unique: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock girilmeli"],
    },
    images: [
      {
        type: String,
        data: Buffer,

        reuired: [true, "Fotoğraf girilmeli"],
      },
    ],
    slug: {
      type: String,
    },
    features: {
      type: String,
    },
    priceSchema: {
      type: {
        price: Number,
        discount: Number,
      },
      required: true,
      validate: {
        validator: function (val) {
          if (!val.discount) {
            val.discount = 0;
          }
          return val.price > val.discount;
        },
        message: "İndirim fiyattan yüksek olamaz",
      },
    },
  },
  { timestamps: true }
);

// DOCUMENT MİDDLEWARE
// productSchema.pre("save", function (next) {
//   this.slug = slugify(this.productName, { lower: true });
//   next();
// });

// QUERY MİDDLEWARE
productSchema.pre(/^find/, function (next) {
  /* regular expression used for to trigger every find. like find() findOne()*/
  /* this.find({
    stock: { $ne: 0 },
  });
  next(); stock will be handled in controller cause i want client show client to stock = 0*/
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
