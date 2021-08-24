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
  status: {
    type: String,
    enum: ORDER_STATUSES,
    default: 'Placed',
  },
});

orderSchema.virtual('cost').get(() => {
  return this.items.reduce((prev, cur) => cur.price * cur.quantity + prev, 0);
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
