const Order = require('../models/Order');
const { totalAmount, checkStatusOrder } = require('../utils/helper');
const { RESTAURANT_OWNER } = require('../constants/user-types');
const Restaurant = require('../models/Restaurant');
const { statusKeyToValue } = require('../constants/order-statuses');

const getOrders = async (req, res) => {
  const { id: userId, userType } = req.body;
  let orders;
  if (userType === RESTAURANT_OWNER) {
    orders = await Order.find({ restaurantOwner: userId }).populate('restaurant').populate('items.meal').exec();
  } else {
    orders = await Order.find({ user: userId }).populate('restaurant').populate('items.meal').exec();
  }
  res.status(200).send(orders);
};

const createOrder = async (req, res) => {
  const { restaurantId, items, id: userId } = req.body;
  const amount = totalAmount(items);
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  const order = new Order({
    items,
    amount,
    restaurant: restaurantId,
    restaurantOwner: restaurant.owner,
    user: userId,
    history: { placed: Date.now() },
  });
  await order.save();
  res.status(201).send(order);
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, userType } = req.body;
  const prevOrder = await Order.findOne({ _id: orderId });
  if (checkStatusOrder(status, prevOrder.status, userType)) {
    const history = { ...prevOrder.history, [status]: Date.now() };
    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      { status: statusKeyToValue[status], history },
      { new: true }
    );
    res.status(200).send(order);
  } else {
    res.status(403).send({ message: 'Action forbidden' });
  }
};

module.exports = { getOrders, createOrder, updateOrderStatus };
