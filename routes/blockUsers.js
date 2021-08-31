const express = require('express');
const { validate } = require('../middlewares/validator');
const { getUsers, blockUser } = require('../controllers/blockUsers');
const { auth, permit, checkOrderOwnership } = require('../middlewares/auth');
const { BUYER, RESTAURANT_OWNER } = require('../constants/user-types');
const { updateOrderSchema, createOrderSchema } = require('../validations/order');
const { blockUserSchema } = require('../validations/blockUser');
const router = express.Router({ mergeParams: true });

router.get('/', auth, permit(RESTAURANT_OWNER), getUsers);
router.patch('/', validate(blockUserSchema), auth, permit(RESTAURANT_OWNER), blockUser);

module.exports = router;
