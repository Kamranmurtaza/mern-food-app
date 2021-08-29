const mongoose = require('mongoose');

const { Schema } = mongoose;

const mealSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
