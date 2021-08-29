const express = require('express');
const { validate } = require('../middlewares/validator');
const {
  getRestaurants,
  addRestaurant,
  getRestaurant,
  editRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurant');
const { restaurantSchema, editRestaurantSchema } = require('../validations/restaurant');
const { auth, permit, checkRestaurantOwnership } = require('../middlewares/auth');
const { RESTAURANT_OWNER } = require('../constants/user-types');
const router = express.Router();

router.get('/', getRestaurants);
router.post('/', validate(restaurantSchema), auth, permit(RESTAURANT_OWNER), addRestaurant);
router.get('/:restaurantId', getRestaurant);
router.patch('/:restaurantId', validate(editRestaurantSchema), auth, checkRestaurantOwnership, editRestaurant);
router.delete('/:restaurantId', auth, checkRestaurantOwnership, deleteRestaurant);

module.exports = router;
