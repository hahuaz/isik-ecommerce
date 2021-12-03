const Iyzipay = require("iyzipay");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const { catchAsync } = require("../utils/AppError");

const iyzipay = new Iyzipay();

exports.initPayForm = catchAsync(async (req, res, next) => {
  const { user, products } = req.body;

  // u can't send data in iysipay url, cause it has max string limit which gives error on orders that have a lot product

  // /* create order that includes productId, quantity, userId */
  // const orders = [];

  // products.forEach((e) => {
  //   const obj = {};
  //   obj.productId = e._id;
  //   obj.quantity = e.quantity;
  //   obj.userId = user._id;
  //   orders.push(obj);
  // });

  // const query = qs.stringify({ orders });

  // TODO https olmalı productionda
  const callbackUrl = `https://${req.hostname}/api/orders/createOrder?user=${user._id}`;

  /* ödeme için her product'i 1 quantity olarak ayarla */
  const basketItems = [];

  products.forEach((product) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= product.quantity; i++) {
      const singleProduct = {};
      singleProduct.id = product._id;
      singleProduct.name = product.productName;
      singleProduct.category1 = product.type;
      singleProduct.price =
        product.priceSchema.price - product.priceSchema.discount;
      singleProduct.itemType = Iyzipay.BASKET_ITEM_TYPE.PHYSICAL;

      basketItems.push(singleProduct);
    }
  });

  /* toplam tutar için her productan fiyat hesapla */
  const productsPrice = basketItems.reduce((t, e) => {
    return t + e.price;
  }, 0);

  const request = {
    price: productsPrice,
    paidPrice: productsPrice + 10 /* TODO 10 LİRA KARGO ÜCRETİ */,
    callbackUrl,
    enabledInstallments: [1],
    buyer: {
      id: user._id,
      name: user.userName,
      surname: user.userSurname,
      gsmNumber: user.phone,
      email: user.email,
      identityNumber: user.tc,
      registrationAddress: user.adress,
      ip: req.ip,
      city: "Istanbul" /* TODO */,
      country: "Turkey",
    },
    shippingAddress: {
      contactName: `${user.userName} ${user.userSurname}`,
      city: "Istanbul",
      country: "Turkey",
      address: user.adress,
    },
    billingAddress: {
      contactName: user.userName,
      city: "Istanbul",
      country: "Turkey",
      address: user.adress,
    },
    basketItems,
  };
  iyzipay.checkoutFormInitialize.create(request, function (err, result) {
    res.send(result);
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  /* front end'de client'e gönderildi:true isteyebilir ve false isteyebilir management için */
  const orders = await Order.find({
    gonderildi: req.params.gonderildi,
  });
  res.json({ orders });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  /* body'de sonuç öğrenmek için token var */
  /* query'de yaratilacak order için ürün id, user id ve quantity var */

  iyzipay.checkoutForm.retrieve(
    {
      locale: Iyzipay.LOCALE.TR,
      conversationId: "123456789",
      token: req.body.token,
    },
    async function (err, result) {
      /* status, token ile yapılan sorgu başarılı mı */
      /* paymentStatus, ödeme başarılı mı  */

      if (result.status === "success" && result.paymentStatus === "SUCCESS") {
        //1- quantity'nin 1 olması zorunluluğundan transaction için ayirdiğin ayni ürün siparişlerini geri birleştir
        const orders = [];

        result.itemTransactions.forEach((e) => {
          const product = {};
          product.productId = e.itemId;
          product.paymentId = result.paymentId;
          product.paymentTransactionId = e.paymentTransactionId;
          product.quantity = 1;
          const notOneOrder = orders.findIndex(
            (b) => b.productId === product.productId
          );
          if (notOneOrder !== -1) {
            orders[notOneOrder].quantity += 1;
            return;
          }
          orders.push(product);
        });
        // for every product in order create order
        orders.forEach(async (e) => {
          //1- get product from db by id
          const product = await Product.findOne({ _id: e.productId });
          //2- create order from product
          const order = new Order({
            /* paymentId sakla iysico için */
            paymentId: e.paymentId,
            /* payment transaction id iysico için */
            paymentTransactionId: e.paymentTransactionId,

            productId: product._id,
            type: product.type,
            productName: product.productName,
            images: product.images[0],
            netPrice: product.priceSchema.price - product.priceSchema.discount,
            quantity: e.quantity,
            user: req.query.user,
          });
          await order.save();
          product.stock -= e.quantity;
          await product.save();
        });
        // await Order.create(req.query);
        /* TODO decrement product's stock */
        return res.redirect("/sepet/onay?status=success");
      }

      res.redirect("/sepet/onay?status=fail");
    }
  );
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  await Order.findByIdAndUpdate(req.body._id, {
    gonderildi: true,
  });
  res.status(201).json({
    status: "success",
    message: "güncellendi",
  });
});

exports.getSiparislerim = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.id }).select("-user");

  res.json({ orders });
});
