const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'RestaurantOwner',
    required: true,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
