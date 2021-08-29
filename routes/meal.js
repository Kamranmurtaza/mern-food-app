const express = require('express');
const { validate } = require('../middlewares/validator');
const { getMeals, addMeal, getMeal, editMeal, deleteMeal } = require('../controllers/meal');
const { mealSchema, editMealSchema } = require('../validations/meal');
const { auth, permit, checkRestaurantOwnership, checkRestaurantMeal } = require('../middlewares/auth');
const { RESTAURANT_OWNER } = require('../constants/user-types');
const router = express.Router({ mergeParams: true });

router.get('/', getMeals);
router.post('/', validate(mealSchema), auth, permit(RESTAURANT_OWNER), addMeal);
router.get('/:mealId', getMeal);
router.patch('/:mealId', validate(editMealSchema), auth, checkRestaurantOwnership, checkRestaurantMeal, editMeal);
router.delete('/:mealId', auth, checkRestaurantOwnership, checkRestaurantMeal, deleteMeal);

module.exports = router;
