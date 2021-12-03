const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const history = require("connect-history-api-fallback");

const { AppError, errorHandler } = require("./utils/AppError");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");

const app = express();

// set http headers for security
app.use(helmet());

// limit requests to api
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: "Çok fazla işlem yaptınız aynı IP'den. Biraz dinlenin.",
});
app.use("/api", limiter);

// data sanitization against nosql query injection
app.use(mongoSanitize());

// data sanitization aganinst xss(will prevent malicious http code )
app.use(xssClean());

/* you will add middleware with using app.use()
express.json() will be used to recognize the incoming Request Object as a JSON Object. then you will be able to use req.body */
// app.use(express.json());

/* to parse body as json*/
app.use(bodyParser.json({ parameterLimit: 100000, limit: "10mb" }));

// to get form data from iysipay(to get retrieve token)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/*serve static file. you can access html and any image in static file.
you access this files from root of the program(no router)*/
// TODO add build vue to public folder

// app.get("/admin", (req, res) => {
//   res.sendFile(`${__dirname}/public/admin/index.html`);
// });

app.get("/admin", (req, res) => {
  console.log("girdi");
  res.sendFile(`${__dirname}/public/about/index.html`);
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// SPA configuration
app.use(history()); /* for vue SPA. to send index html. */
app.use(express.static(`${__dirname}/public`));

// this wont work cause of spa
// app.all("*", (req, res, next) => {
//   /* error yarat */
//   const err = new AppError("Böyle bir şey yok", 404);

//   /* when u provide an argument to next, express will automaticly persume there is err
//   and call error handler */
//   next(err);
// });

/* err handler */
app.use(errorHandler);

module.exports = app;
