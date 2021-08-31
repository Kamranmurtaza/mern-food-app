const Restaurant = require('../models/Restaurant');
const { RestaurantOwner } = require('../models/User');

const isBlocked = async (req, res, next) => {
  const { restaurantId, id: userId } = req.body;

  const restaurant = await Restaurant.findById(restaurantId);
  let restaurantOwner = await RestaurantOwner.findById(restaurant.owner);
  restaurantOwner = restaurantOwner.toObject();
  const index = restaurantOwner.blockedUsers.findIndex((blockedUser) => blockedUser.equals(userId));
  if (index === -1) {
    next();
  } else {
    res.status(403).send({ message: 'You are blocked by restaurant owner' });
  }
};

module.exports = { isBlocked };
