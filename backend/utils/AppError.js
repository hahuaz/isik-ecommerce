class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    /* fail request ile ilgidilidr o yüzden 500le başlamaz. ama error 500le başlar bir şeyler ters gitmiştir. ve bu program error'unu bende tahmin edip kendim 500 kodu verip oluşturabilirim */
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    /* we predict and create error, isOperational will exist and we check it if error is from our side. */
    this.isOperational = true;

    if (process.env.NODE_ENV === "development") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const errorHandler = (err, req, res, next) => {
  // MONGOOSE ERROR
  // Kayıtlı kullanıcı
  if (err.code === 11000 && err.keyPattern.hasOwnProperty("email")) {
    return res.status(401).json({
      message: "Bu maille kayıtlı bir kullanıcı zaten var",
      status: "fail",
    });
  }
  // Aynı isimli ürün (DUPLİCATE ERR)
  if (err.code === 11000 && err.keyPattern.hasOwnProperty("productName")) {
    return res.status(404).json({
      message: `'${err.keyValue.productName}' adlı ürün zaten var. Başka isim kullanın yada var olan ürünün stoğunu güncelleyin.`,
      status: "fail",
    });
  }
  // Validation error for Product model
  if (err._message === "Product validation failed") {
    const validationErrors = Object.values(err.errors)
      .map((el) => el.properties.message)
      .join(" ");
    return res.status(404).json({
      status: "error",
      message: validationErrors,
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "JWT yanlış. Lütfen tekrar giriş yapın.",
    });
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
  });
};

const catchAsync = (fn) => {
  /* will return anonymous function that will signed to handler  */
  return (req, res, next) => {
    /* our actual function is fn which will be called by outer function */
    fn(req, res, next).catch((err) => next(err));
  };
};

module.exports = { AppError, errorHandler, catchAsync };
