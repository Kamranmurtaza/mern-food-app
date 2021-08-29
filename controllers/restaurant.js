const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res) => {
  const { owner } = req.query;
  let restaurants;
  console.log(req.body);
  if (owner) {
    restaurants = await Restaurant.find({ owner });
  } else {
    restaurants = await Restaurant.find();
  }
  res.status(200).send(restaurants);
};

const addRestaurant = async (req, res) => {
  const { name, description = '', id: userId } = req.body;
  const restaurant = new Restaurant({ name, description, owner: userId });
  await restaurant.save();
  res.status(201).send(restaurant);
};

const getRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (restaurant) {
    res.status(200).send(restaurant);
  } else {
    res.status(404).send({ message: 'Restaurant not found' });
  }
};

const editRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOneAndUpdate({ _id: restaurantId }, req.body, { new: true });
  if (restaurant) {
    res.status(200).send(restaurant);
  } else {
    res.status(404).send({ message: 'Restaurant not found' });
  }
};

const deleteRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOneAndRemove({ _id: restaurantId });
  if (restaurant) {
    res.status(200).send(restaurant);
  } else {
    res.status(404).send({ message: 'Restaurant not found' });
  }
};

module.exports = { getRestaurants, addRestaurant, getRestaurant, editRestaurant, deleteRestaurant };
