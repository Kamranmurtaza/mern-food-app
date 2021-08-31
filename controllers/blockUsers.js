const Order = require('../models/Order');
const { Buyer, RestaurantOwner } = require('../models/User');

const getUsers = async (req, res) => {
  const { id: userId } = req.body;

  const usersIds = await Order.distinct('user', { restaurantOwner: userId });
  let users = await Buyer.find({ _id: usersIds }).select({ firstName: 1, lastName: 1, email: 1, _id: 1 });
  let blockedUsers = await RestaurantOwner.findById(userId);
  users = users.map((user) => user.toObject());
  blockedUsers = blockedUsers.toObject();
  const usersWithStatus = users.map((user) => {
    const status = blockedUsers.blockedUsers.findIndex((blockedUser) => blockedUser.equals(user._id));
    return {
      ...user,
      block: status === -1 ? false : true,
    };
  });
  res.status(200).send(usersWithStatus);
};

const blockUser = async (req, res) => {
  const { buyerId, block, id: userId } = req.body;
  if (block) {
    await RestaurantOwner.updateOne({ _id: userId }, { $addToSet: { blockedUsers: buyerId } });
  } else {
    await RestaurantOwner.updateOne({ _id: userId }, { $pull: { blockedUsers: buyerId } });
  }

  res.status(200).send({ _id: buyerId, block });
};

module.exports = { getUsers, blockUser };
