const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const options = { discriminatorKey: 'userType' };
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      maxlength: 50,
      required: true,
    },
    lastName: {
      type: String,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      unique: 1,
      required: true,
    },
    password: {
      type: String,
      minglength: 5,
      required: true,
    },
  },
  options
);

userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt
      .hash(user.password, saltRounds)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

const buyerSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },
  },
  options
);

const Buyer = User.discriminator('Buyer', buyerSchema);

const restaurantOwnerSchema = new Schema(
  {
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
      },
    ],
  },
  options
);

const RestaurantOwner = User.discriminator('RestaurantOwner', restaurantOwnerSchema);

module.exports = { User, Buyer, RestaurantOwner };
