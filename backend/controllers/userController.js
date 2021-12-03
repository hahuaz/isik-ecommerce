const crypto = require("crypto");
const User = require("../models/userModel");
const { catchAsync, AppError } = require("../utils/AppError");
const { createJwtAndSendResponse } = require("./authController");
const { sendEmail } = require("../utils/email");

// TODO param olarak mı gönder, yoksa body'de mi gönder? front-end için hangisi daha iyi

exports.getUser = catchAsync(async (req, res, next) => {
  res.status(200).send(req.user);
});

// const filterObject =(...sanitize, ...allowed)=>{
//   const sanitized = sanitize.map(el => allowed.includes(el))
// }

exports.createUser = catchAsync(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();

  createJwtAndSendResponse(user, 201, res);
});

exports.loginUser = catchAsync(async (req, res, next) => {
  /* if body empty */
  if (!req.body.email && !req.body.password) {
    return next(new AppError("Lütfen mail ve şifre girin"), 404);
  }

  /*1.in your model you set passwrod select:false. or
    2.in pre find middleware you specified: this.find().select("-password")
    this make your query doens't show password. but if u want to password in your spesific query u have to override select.*/
  const user = await User.findOne({
    email: req.body.email,
  }).select("+password");
  /* note that: password  and +password different things
  password will make user have only password property
  +password will make override pre-defined query config and include password too */

  /* const booleanPassword = await user.comparePassword(
    req.body.password,
    user.password
  ); */

  /* if user not found or password incorrect */
  if (!user || !(await user.comparePassword(req.body.password, user.password)))
    return next(new AppError("Email yada şifre yanlış", 401));

  createJwtAndSendResponse(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1-get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("Böyle bir kullanıcı yok", 404));
  // 2-generate random token
  const resetToken = user.createPasswordResetToken();
  /* console.log(user); !! even if u see in console that there is this.passwordResetToken, it's not saved to db untill you use user.save() BECAUSE THESE İS METHOD*/
  /* not if u have confirmPassword property in model then save will give u error cause save will trigger validations and u don't have any confirmPassword value in user that stored db so u specify 
  user.save({validateBeforeSave:false})*/
  await user.save();

  // 3-send token as email
  /* TODO */
  const clickToResetURL = `${req.protocol}://${req.hostname}/reset-password/${resetToken}`;
  const message = `Şifrenizi mi unuttunuz? Şifrenizi değiştirmek için bu adrese patch ile gidin:${clickToResetURL} Bu link 10 dakika geçerlidir.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Şifrenizi mi unuttunuz?",
      message,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();

    return res.status(500).json({
      status: 500,
      message: "E-mail gönderme başarısız. Daha sonra tekrar deneyin!",
    });
  }
  res.status(200).json({
    status: "success",
    message: "E-mailinize şifre yenileme linki gönderildi",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1-get user based on token
  /* first hash user token for compore the user token with token that stored in db */
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2-if there is user and token not expired allow user update pass
  if (!user) {
    return next(
      new AppError(
        "Yanlış token kullandınız yada resetleme süresi geçti. Tekrar deneyin.",
        400
      )
    );
  }
  // 3-update changedPasswordAt for user(it will make automaticly bu pre save)
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save(); /* burda validation çalışıyor. eğer kısa password girerse error vercek */
  // 4-log the user in, send jwt

  createJwtAndSendResponse(user, 201, res);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const allowed = ["email", "adress", "phone", "tc"];
  /* password will get seperate route and gonna use save */
  const sanitized = {};
  Object.keys(req.body).forEach((el) => {
    if (allowed.includes(el)) sanitized[el] = req.body[el];
  });

  const user = await User.findOneAndUpdate({ _id: req.user.id }, sanitized, {
    new: true,
    runValidators: true,
  });

  if (!user) return res.status(400).send("Böyle bir kullanıcı yok");
  res.status(200).json(user);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1-get password from database cause u don't have password on req.user(select:false on password)
  const user = await User.findOne({ _id: req.user._id }).select("+password");
  // 2-ask for pass again and check if it's corret
  const checkPassword = await req.user.comparePassword(
    req.body.currentPassword,
    user.password
  );
  if (!checkPassword) {
    return next(new AppError("Şifre yanlış!", 401));
  }
  // 3-update and send jwt
  user.password = req.body.newPassword;
  user.save();

  createJwtAndSendResponse(req.user, 201, res);
});

exports.deleteMany = catchAsync(async (req, res, next) => {
  await User.deleteMany();
  res.status(200).send();
});
