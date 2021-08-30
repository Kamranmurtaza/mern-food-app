const jwt = require('jsonwebtoken');
const Restaurant = require('../models/Restaurant');
const Meal = require('../models/Meal');

const permit = (role) => {
  return (req, res, next) => {
    const { userType } = req.body;
    if (userType === role) {
      next();
    } else {
      res.status(403).send({ message: 'You are not allowed to perform this action' });
    }
  };
};

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body = { ...req.body, ...decoded };

    next();
  } catch (error) {
    return res.status(401).send({ message: 'Login required' });
  }
};

const checkRestaurantOwnership = async (req, res, next) => {
  const { restaurantId } = req.params;
  const { id: userId } = req.body;

  const restaurant = await Restaurant.findById(restaurantId);

  if (restaurant && restaurant.owner.equals(userId)) {
    next();
  } else {
    res.status(403).send({ message: 'Action forbidden' });
  }
};

const checkRestaurantMeal = async (req, res, next) => {
  const { restaurantId, mealId } = req.params;

  const meal = await Meal.findById(mealId);

  if (meal && meal.restaurant.equals(restaurantId)) {
    next();
  } else {
    res.status(403).send({ message: 'Action forbidden' });
  }
};

module.exports = { auth, permit, checkRestaurantOwnership, checkRestaurantMeal };
