const mongoose = require('mongoose');
const { ORDER_STATUSES } = require('../constants/order-statuses');

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true,
  },
  items: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: 'Meal',
      },
      quantity: {
        type: Number,
        min: 1,
      },
    },
  ],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  restaurantOwner: {
    type: Schema.Types.ObjectId,
    ref: 'RestaurantOwner',
    required: true,
  },
  status: {
    type: String,
    enum: ORDER_STATUSES,
    default: 'Placed',
  },
  amount: {
    type: Number,
    required: true,
  },
  history: {
    placed: Date,
    cancelled: Date,
    processing: Date,
    inRoute: Date,
    delivered: Date,
    received: Date,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
