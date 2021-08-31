const express = require('express');
const { validate } = require('../middlewares/validator');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/order');
const { auth, permit, checkOrderOwnership } = require('../middlewares/auth');
const { BUYER } = require('../constants/user-types');
const { updateOrderSchema, createOrderSchema } = require('../validations/order');
const { isBlocked } = require('../middlewares/isBlocked');
const router = express.Router({ mergeParams: true });

router.get('/', auth, getOrders);
router.post('/', validate(createOrderSchema), auth, permit(BUYER), isBlocked, createOrder);
router.patch('/:orderId', validate(updateOrderSchema), auth, checkOrderOwnership, updateOrderStatus);

module.exports = router;
