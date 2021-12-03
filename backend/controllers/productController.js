const multer = require("multer");
const sharp = require("sharp");
const aws = require("aws-sdk");
const slugify = require("slugify");

const s3 = new aws.S3({
  accessKeyId: process.env.AMAZON_ID,
  secretAccessKey: process.env.AMAZON_SECRET,
});

const Product = require("../models/productModel");
const { catchAsync, AppError } = require("../utils/AppError");

// config multer
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Sadece resim dosyası yükleyebilirsiniz", 401), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.fields([{ name: "images", maxCount: 3 }]);

exports.getProducts = catchAsync(async (req, res, next) => {
  if (req.params.id) {
    const product = await Product.findOne({
      _id: req.params.id,
      stock: { $ne: 0 },
      type: req.params.type,
    });
    if (!product) return next(new AppError("Bu id ile ürün yok", 200));
    return res.status(200).json(product);
  }
  const products = await Product.find({
    stock: { $ne: 0 },
    type: req.params.type,
  });

  if (!products.length)
    return next(new AppError("Bu type'da hiç ürün yok", 200));
  res.status(200).json(products);
});

exports.createProduct = catchAsync(async (req, res, next) => {
  /* resim yollamamışsa map server error verir. */

  if (!req.files.images.length) {
    return next(new AppError("Resim girin.", 401));
  }
  /* client'tan gelen stringi objeye çevir */
  req.body = JSON.parse(req.body.inputs);
  req.body.stock *= 1;
  req.body.priceSchema.price *= 1;
  req.body.priceSchema.discount *= 1;

  /* resim ismi için, product ismini slugla */
  req.body.slug = slugify(req.body.productName, { lower: true });
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const image = await sharp(file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer();

      const params = {
        Bucket: process.env.AMAZON_BUCKET_NAME,
        Key: `${req.body.slug}-${i + 1}.jpeg`, // File name you want to save as in S3
        Body: image /* you give image as buffer */,
        ContentType:
          "image/jpeg" /* client-side teslim alırken bilgilendirme amaçlı */,
        ACL: "public-read" /* access public */,
      };

      // Uploading files to the bucket. data.Location is image adress
      const data = await s3.upload(params).promise();
      req.body.images[i] = data.Location;
      return data; /* map promise return etmeliki dişarıda promise.all ile bekleyelim ve diş kod duraklasın promise all.da*/
    })
  );
  const product = new Product(req.body);
  await product.save();

  res.status(200).json(product);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  await Product.findOneAndUpdate({ _id: req.params.id }, req.body);

  res.status(201).json({ status: "success", message: "Stock Güncellendi" });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete({ _id: req.params.id });
  res.status(201).json({ status: "success", message: "Ürün silindi!" });
});

exports.StockControl = catchAsync(async (req, res, next) => {
  const products = await Product.find({ stock: 0 });
  res.status(200).send(products);
});
