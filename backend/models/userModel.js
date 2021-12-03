const crypto = require("crypto");

const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Kullanıcı için isim belirleyin"],
    trim: true,
  },
  userSurname: {
    type: String,
    trim: true,
    required: true,
  },
  tc: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Kullanıcı için şifre belirleyin"],
    trim: true,
    minlength: [6, "Şifre en az 6 haneli olmalı"],
    select: false /* this will not show password in query but in create it will show. if u set this u won't be able to use this.password in pre hooks, methods!!!. */,
  },
  email: {
    type: String,
    required: [true, "Kullanıcı için mail belirleyin"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Geçersiz mail. Lütfe kontrol edin"],
  },
  adress: {
    type: String,
  },
  phone: {
    type: Number,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});
/* İNSTANCE METHOD will be available all instances of class(model). in an other saying, will be available on document*/
userSchema.methods.comparePassword = async function (candidatePass, userPass) {
  /* in here this points to active document but since we set password select:false  can't access it with this */
  return await bcryptjs.compare(candidatePass, userPass);
};
userSchema.methods.changedPasswordAfterJWT = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changeTimeStamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  /* hash token to store in db. note that:in methods u just modify data, u explicitly save these. there is no passwordResetToken untill you use user.save() BECAUSE THESE İS METHOD*/
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

/* DOCUMENT MİDDLEWARE */
/* pre save runs before create and save */
userSchema.pre("save", async function (next) {
  /* this is middleware u have to use next() */
  /* u use classic function decleration cause u direclty access document with this */

  // if password newly created or updated hash it before saving to db
  /* TODO this doesn't trigger on update */
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
  if (this.isModified("password") && !this.isNew) {
    /* password yenilenmişse ve döküman yeni değilse(create olmadıysa) */
    this.passwordChangedAt = Date.now() - 5000;
    /* 5 saniye geçmişe at ki password değiştirdiğinde yolladığın token geçersiz olmasın.(programsal gecikme olup token  geç (ileri tarihte) yaratılırsa diye) */
  }
  next();
});

/* QUERY MİDDLEWARE */
// userSchema.pre(/^find/, function (next) {
//   /* this points to query */
// });

/* virtual proporties */

// userSchema.virtual("ordersOfUser", {
//   ref: "Order",
//   foreignField: "user",
//   localField: "_id",
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
