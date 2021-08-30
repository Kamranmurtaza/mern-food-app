const jwt = require('jsonwebtoken');
const { RestaurantOwner, Buyer, User } = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const result = user.validatePassword(password);

    if (result) {
      const userObject = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        ...(user.cartId && { cartId: user.cartId }),
      };
      const token = jwt.sign(userObject, process.env.JWT_SECRET);
      return res.status(200).send({ ...userObject, token });
    }
  }

  res.status(401).send({ message: 'Invalid email or password' });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, isRestaurantOwner } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const userObject = {
      firstName,
      lastName,
      email,
      password,
    };
    if (isRestaurantOwner) {
      const restaurantOwner = new RestaurantOwner(userObject);
      await restaurantOwner.save();
    } else {
      const buyer = new Buyer(userObject);
      await buyer.save();
    }
    return res.status(201).send({
      message: 'User created successfully',
    });
  }
  res.status(409).send({ message: 'Email already exists' });
};

module.exports = { login, register };
