const Cart = require('../models/Cart');
const { Buyer } = require('../models/User');

const getCart = async (req, res) => {
  const { cartId } = req.params;
  const cart = await Cart.findOne({ _id: cartId }).populate('items.meal').exec();
  if (cart) {
    res.status(200).send(cart);
  } else {
    res.status(404).send({ message: 'cart not found' });
  }
};

const editCart = async (req, res) => {
  const { cartId, items, restaurantId, id: userId } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { _id: cartId, user: userId },
    { items, restaurant: restaurantId },
    { new: true }
  );
  if (cart) {
    let updatedCart = await Cart.findOne({ _id: cart._id }).populate('items.meal').exec();
    res.status(200).send(updatedCart);
  } else {
    const newCart = new Cart({ items, restaurant: restaurantId, user: userId });
    await newCart.save();
    await Buyer.findOneAndUpdate({ _id: userId }, { cartId: newCart._id }, { new: true });
    let updatedCart = await Cart.findOne({ _id: newCart._id }).populate('items.meal').exec();
    res.status(201).send(updatedCart);
  }
};

module.exports = { getCart, editCart };
