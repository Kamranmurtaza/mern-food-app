const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
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
  },
});

cartSchema.virtual('totalPrice').get(() => {
  return this.items.reduce((prev, cur) => cur.price * cur.quantity + prev, 0);
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
