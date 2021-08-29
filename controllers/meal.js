const Meal = require('../models/Meal');

const getMeals = async (req, res) => {
  const { restaurantId } = req.params;
  const meals = await Meal.find({ restaurant: restaurantId }).populate('restaurant').exec();
  res.status(200).send(meals);
};

const addMeal = async (req, res) => {
  const { name, description = '', price } = req.body;
  const { restaurantId } = req.params;
  const meal = new Meal({ name, description, price, restaurant: restaurantId });
  await meal.save();
  res.status(201).send(meal.populate('restaurant'));
};

const getMeal = async (req, res) => {
  const { mealId } = req.params;
  const meal = await Meal.findOne({ _id: mealId }).populate('restaurant').exec();
  if (meal) {
    res.status(200).send(meal);
  } else {
    res.status(404).send({ message: 'Meal not found' });
  }
};

const editMeal = async (req, res) => {
  const { mealId } = req.params;
  const meal = await Meal.findOneAndUpdate({ _id: mealId }, req.body, { new: true });
  if (meal) {
    res.status(200).send(meal);
  } else {
    res.status(404).send({ message: 'Meal not found' });
  }
};

const deleteMeal = async (req, res) => {
  const { mealId } = req.params;
  const meal = await Meal.findOneAndRemove({ _id: mealId });
  if (meal) {
    res.status(200).send(meal);
  } else {
    res.status(404).send({ message: 'Meal not found' });
  }
};

module.exports = { getMeals, addMeal, getMeal, editMeal, deleteMeal };
