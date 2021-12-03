const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const { catchAsync, AppError } = require("../utils/AppError");
const User = require("../models/userModel");

exports.createJwtAndSendResponse = (user, statusCode, res) => {
  user.password = undefined;
  const { _id } = user;
  /* jwt expect plain thing so u can't use user._id in sign */
  const jwtToken = jwt.sign({ _id }, process.env.JWT_SECRET);

  res.cookie("jwt", jwtToken, {
    // secure:true /* this will be sure cookie transfer only with https */
    httpOnly: true,
  });
  res.status(statusCode).json({
    user,
    jwtToken,
  });
};
exports.authControl = catchAsync(async (req, res, next) => {
  // 1-check is there a token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    /* if authorization doesn't exist startsWith would give u err. so first check if it exist */
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("Lütfen önce giriş yapın.", 401));

  // 2-verification token
  /*!!when promisify you take function in parantheses. do not include arguments 
  if verify result false then error thrown automaticly*/
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  /* decoded holds user id */
  const user = await User.findOne({ _id: decoded._id });
  if (!user) return next(new AppError("Böyle bir kullanıcı yok.", 404));

  req.user = user;
  // 3-password changed after jwt issued
  if (user.changedPasswordAfterJWT(decoded.iat)) {
    return next(
      new AppError("Şifrenizi değiştirdiniz. Tekrar giriş yapın.", 401)
    );
  }
  next();
});

exports.authAdmin = catchAsync(async (req, res, next) => {
  const user = req.user.toObject(); /* toObject will give access you to use properties that doesn't defined in model. note: u can see them without toObject() but u can't use them without it.*/
  if (!(user.role === "admin")) {
    return next(new AppError("Buna yetkiniz yok", 404));
  }
  next();
});
