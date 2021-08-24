const mongoose = require('mongoose');

const { Schema } = mongoose;

const 
const mealSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true,
  },
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
    },
  ],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  status: {
    type: String, 
    enum : ['Placed','Canceled', 'Processing', 'In Route', 'Delivered', 'Received'], 
    default: 'normal' 
  },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
